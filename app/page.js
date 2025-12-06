import { testAction } from './actions';

export default function Home() {
  return (
    <form action={testAction}>
      <button type="submit">Test</button>
    </form>
  );
}
