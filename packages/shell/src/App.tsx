import 'index.css';
import { RouterContext } from './application/routes/context';

export default function App() {
  return (
    <RouterContext>
      <h1>CONTAINER GOD</h1>
      <a href="/">main</a>
      <a href="/devil">DEVIL</a>
    </RouterContext>
  );
}
