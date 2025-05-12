import { CLIApplication} from './cli/index.js';
import { HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/commands/index.js';

const bootstrap = () => {
  const cliApp = new CLIApplication();

  cliApp.register(new HelpCommand());
  cliApp.register(new VersionCommand());
  cliApp.register(new ImportCommand());
  cliApp.register(new GenerateCommand());

  cliApp.run(process.argv.slice(2));
};

bootstrap();
