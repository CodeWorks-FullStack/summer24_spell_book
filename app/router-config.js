import { AccountController } from "./controllers/AccountController.js";
import { DNDSpellsController } from "./controllers/DNDSpellsController.js";
import { SandboxSpellsController } from "./controllers/SandboxSpellsController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [DNDSpellsController, SandboxSpellsController],
    view: 'app/views/HomeView.html'
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])




