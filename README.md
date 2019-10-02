# Slack App: Clear Channel Messages

While building Slack apps, your test channel (like `#demo`)
can rapidly fill with spam as you test out message formats and more.

This Slack app adds a simple `/cls` (or `/cmd cls`) command that clears the most recent Slack
activity in a channel. For example, `/cls 10` (or `/cmd cls 10`) will clear the 10
most recent messages in a channel.

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

The Slack app itself will run on [Standard Library](https://stdlib.com), a
free-to-use API and workflow hosting platform, **powered by Node.js**, that will
use this repository as its project structure.

We recommend installing this app primarily in development workspaces -
please don't give your entire production workspace the ability to destroy
other people's messages!

# Example Usage

<img src="/readme/images/slack-cls-gif.gif" width="400">

You can use this app by typing `/cls` (or `/cmd cls`) depending on how you
choose to deploy your Slack application. More on that below, in [Installation](#installation).

By default, the Slack `/cls` (or `/cmd cls`) command takes one argument: an integer
between 1 and 10. If an invalid value is provided, it will default to 1 and
the maximum number of lines you can remove is 10.

## Clear 1 Line

You can clear one line by typing `/cls` (or `/cmd cls`).

## Clear <= 10 lines

You can clear 5 lines by typing `/cls 5` (or `/cmd cls 5`).

# Table of Contents

1. [How It Works](#how-it-works)
1. [Installation](#installation)
   1. [Easy Slack App Installation (1 Step)](#easy-slack-app-installation-1-step)
   1. [Advanced Slack App Installation (6 Steps)](#advanced-slack-app-installation-6-steps)
1. [Making Changes](#making-changes)
   1. [via Web Browser](#via-web-browser)
   1. [via Command Line](#via-command-line)
1. [Shipping to Production](#shipping-to-production)
1. [Support](#support)
1. [Acknowledgements](#acknowledgements)

# How It Works

This application sets up a simple webhook response to a Slack event
and then makes requests to Slack's APIs. Standard Library's platform
automatically handles webhook signing, routing, and authentication.

The `stdlib.json` file contained in this repository automatically tells
Standard Library to configure the webhook routing, and sets a webhook timeout.

```json
{
  "name": "/slack-cls-command",
  "timeout": 20000,
  "version": "0.0.0",
  "description": "",
  "events": [
    {
      "slack.command": {
        "filename": "events/slack/command/cls",
        "subtype": {
          "command": "cls"
        }
      }
    }
  ]
}
```

The file `/functions/events/slack/command/cls.js` exports a webhook (a web API)
that will handle the event from `stdlib.json`. It makes a few API requests to
Slack APIs, culminating in message deletion.

```javascript
// Retrieve messageCount from /cls command
// min. being "1", max being "10"
let messageCount = Math.min(Math.max(parseInt(event.text) || 0, 1), 10);
// Only loop through the number of messages in channel at maximum
messageCount = Math.min(messageCount, result.step2.messages.length);

// Destroy every message in array
for (let i = 0; i < messageCount; i++) {

  console.log(`Running slack.messages[@0.5.5].destroy()...`);

  result.step3 = {};
  result.step3.response = await lib.slack.messages['@0.5.5'].destroy({
    id: result.step1.channel.id, // required
    ts: result.step2.messages[i].ts, // required
    as_user: true
  });

}
```

# Installation

You can install this Slack app to your workspace using [Standard Library](https://stdlib.com/).
Standard Library is an API and workflow development platform that automatically
(1) generates and hosts workflow code for you and (2) handles API authentication
to multiple app APIs (i.e. Slack, Stripe, Airtable) seamlessly with a single token.

When you're ready, you can click the button below to deploy the code immediately.
**You will be asked to configure your Slack application automatically as part
of the deployment process.**

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

On the following page, you'll see an option to **Link Resource**. Click it to
proceed.

<img src="/readme/images/slack-link-resource.png" width="400">

Next, you'll be taken to a list of your previously
linked Slack apps on Standard Library. Choose one if available, otherwise click
**Link New Resource**.

<img src="/readme/images/slack-link-new-resource.png" width="400">

## Easy Slack App Installation (1 Step)

The easiest way to configure this Slack application is by installing the
official Standard Library slack application, which exposes a `/cmd` command.
Using this method will make the `cls` command available via `/cmd cls`.

To use this method, when linking a new resource choose the first available option:

<img src="/readme/images/slack-install-options.png" width="400">

This process will install the **Official Standard Library Slack App** to a
workspace of your choice. Once installed, you'll be able to enter your
Slack app details (name, display picture):

<img src="/readme/images/slack-set-app-details.png" width="400">

**That's it!**

Your command will be available at `/cmd cls`.

## Advanced Slack App Installation (6 Steps)

If you'd like to configure your own Slack application to make the command
available at `/cls`, you'll have to create an internal Slack app from scratch.
Simply choose the **Custom Internal Application** option. This gives you a little
more control over your Slack app, at the expense of some extra configuration time.

<img src="/readme/images/slack-custom-internal-app.png" width="400">

**The advanced process takes anywhere from 5 - 15 minutes**, depending on your
familiarity with Slack's application ecosystem.
You'll be walked through it in the Standard Library interface.

# Making Changes

There are two ways to modify your application. The first is via our in-browser
editor, [Code on Standard Library](https://code.stdlib.com/). The second is
via the [Standard Library CLI](https://github.com/stdlib/lib).

## via Web Browser

Simply visit [`code.stdlib.com`](https://code.stdlib.com) and pick your project
from the left sidebar. You can easily make updates and changes this way, and
deploy directly from your browser.

## via Command Line

You can either export your project via tarball by right-clicking the project
once open on [Code on Standard Library](https://code.stdlib.com/). You can then
install the CLI tools from [stdlib/lib](https://github.com/stdlib/lib) to test,
makes changes, and deploy.

```shell
# Test event locally
# NOTE: You'll need to set STDLIB_SECRET_TOKEN in env.json
lib .events.slack.command.cls --event '{"channel_id":"CXXXXX","text":""}'

# Deploy to dev environment
lib up dev
```

Alternatively, you can retrieve your package via `lib get`...

```shell
lib get <username>/<project-name>@dev
```

# Shipping to Production

You might notice that you encounter the following debug message when running the
`/cls` / `/cmd cls` command:

<img src="/readme/images/slack-dev-alert.png" width="400">

This message **only appears in dev environments**. Standard Library has
easy dev / prod environment management, if you'd like to ship to production,
visit [`build.stdlib.com/projects`](https://build.stdlib.com/projects),
find your project and select it.

From the environment management screen, simply click **Ship Release**.

<img src="/readme/images/slack-env-management.png" width="400">

You'll be asked to link a new account, but it will remove the message when
in production.

# Support

Via Slack: [`libdev.slack.com`](https://libdev.slack.com/)

You can request an invitation by clicking `Community > Slack` in the top bar
on [`https://stdlib.com`](https://stdlib.com).

Via Twitter: [@StdLibHQ](https://twitter.com/StdLibHQ)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com)

# Acknowledgements

Thanks to the Standard Library team and community for all the support!

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).
We're also hiring! E-mail [contact@stdlib.com](mailto:contact@stdlib.com) with
your resume if you're interested in helping build the future of app to app
API tooling.

Happy hacking!

&copy; 2019 Standard Library (Polybit Inc.)
