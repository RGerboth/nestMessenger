import { Controller, Get } from '@nestjs/common';
import {
    HttpHealthIndicator,
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { _status } from './metrics';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator
    ) {}

    @Get('ping')
    @HealthCheck()
    async check() {
        const db = async () => this.db.pingCheck('database_status');
        return {
            response: 'pong',
            version: process.env.npm_package_version,
            status: _status(),
            dbStatus: {
                pg: await db().then(db => db.database_status.status),
            },
        };
    }

    @Get('health')
    @HealthCheck()
    healthCheck() {
        return this.health.check([
            () =>
                this.http.pingCheck(
                    'sendgrid_status',
                    'https://3tgl2vf85cht.statuspage.io/api/v2/status.json'
                ),
            () =>
                this.http.pingCheck(
                    'twilio_status',
                    'https://gpkpyklzq55q.statuspage.io/api/v2/status.json'
                ),
            () =>
                this.http.pingCheck('slack_status', 'https://status.slack.com/api/v2.0.0/current'),
            () => this.http.pingCheck('teams_status', 'https://status.office365.com/'),
        ]);
    }
}
