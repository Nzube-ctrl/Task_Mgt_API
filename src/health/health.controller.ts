import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private memory: MemoryHealthIndicator
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            // Check if the API is reachable
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),

            // Check if memory usage is under 300MB
            () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
        ]);
    }
}