import api from "@atproto/api";
const { BskyAgent } = api

const email = "test@test.co";
const handle = "whatismyname.test";
const password = "testpassword";

async function test() {

  const agent = new BskyAgent({
    service: "http://localhost:2583/",
    persistSession: (evt, sess) => {
      console.log(`[bsky] [Event: ${evt}] => [ Has Session: ${sess ? true : false} ]`);
    },
  });

  const createAccountResult = await agent.createAccount({ email, password, handle });
  console.log("createAccountResult", createAccountResult);

  const loginResult = await agent.login({ identifier: handle, password })
  console.log("loginResult", loginResult)

  const postResult = await agent.post({ text: "Hi there!" })
  console.log("postResult", postResult)

  const timelineResult = await agent.getTimeline({ limit: 10 },{headers: { authorization: `Bearer ${loginResult.data.accessJwt}` }})
  console.log("timelineResult", timelineResult)

  const timelineUppercaseAuthorizationResult = await agent.getTimeline({ limit: 10 },{headers: { Authorization: `Bearer ${loginResult.data.accessJwt}` }})
  console.log("timelineUppercaseAuthorizationResult", timelineUppercaseAuthorizationResult)

}

(async () => {
  await test();
})();
