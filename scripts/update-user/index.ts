import { SQL } from "bun";

const sql = new SQL(
  "postgresql://postgres:~!Wbvxwet=JdgcKB@10.106.189.11:5432/cscd_mkm?sslmode=disable"
);

// sql.options.host = "10.106.189.11";
// sql.options.port = 5432;
// sql.options.database = "cscd_mkm";
// sql.options.username = "postgres";
// sql.options.password = "~!Wbvxwet=JdgcKB";
// sql.options.ssl = {
//   rejectUnauthorized: false,
// };
// sql.options.url =
//   "postgresql://postgres:~!Wbvxwet=JdgcKB@10.106.189.11:5432/cscd_mkm?ssl=disable";

const accessToken = "u-d3vsWBRmJ4VaxdZ64Z_Ibg005QS1hl_9jE00h5yw0ylX";

const users = await sql`SELECT * FROM users`;

let dup = [];

for (const user of users) {
  // await sql`UPDATE users SET openid = ${user.id} WHERE id = ${user.id}`

  const qs = new URLSearchParams();
  qs.set("query", user.email);
  const res = await fetch(
    `https://open.feishu.cn/open-apis/search/v1/user?${qs.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (data.data.users.length > 1) {
    dup.push(data);
  }

  const found = data.data.users.at(0);

  if (found && found.open_id !== user.open_id) {
    await sql`UPDATE users SET open_id = ${found.open_id} WHERE id = ${user.id}`;
    console.log("updated", user.id, found.open_id);
  }
}

console.log(dup);
