import { Container } from 'inversion-tools/dist/src/ioc';
import { App } from './app';
import { StateController } from './controller/state/StateController';
import { TYPES } from './types';

Container.bind(TYPES.Application, App);
Container.bind(TYPES.StateController, StateController);

async function bootstrap (): Promise<App> {
	const app = Container.resolve<App>(TYPES.Application);
	await app.init();
	return app;
}

export const boot = bootstrap();