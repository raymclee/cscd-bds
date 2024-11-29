import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const HTTP_ENDPOINT = "/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      // <-- Additional headers like 'Authorization' would go here
    },
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  });

  if (resp.status === 401) {
    throw new AuthenticationError();
  }

  if (resp.status === 403) {
    throw new AuthorizationError();
  }

  if (!resp.ok) {
    throw new NetworkError();
  }

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource(), {
      // queryCacheExpirationTime: 1 * 5 * 1000,
    }),
  });
}

export const RelayEnvironment = createRelayEnvironment();

export class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}

export class AuthenticationError extends Error {
  constructor() {
    super("Authentication required");
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super("Authorization required");
  }
}
