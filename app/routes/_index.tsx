import type { MetaFunction, LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env } = context.cloudflare;
  const { results } = await env.DB.prepare(
    'SELECT * FROM products where id = ?1'
  )
    .bind(params.productId)
    .all();
  return json(results);
};

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!',
    },
  ];
};

export default function Index() {
  const results = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}
