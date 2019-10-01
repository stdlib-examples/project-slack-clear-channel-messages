# Slack App: Clear Channel Messages

This Slack app adds a simple `/cls` / `/cmd cls` command that clears the most recent Slack
activity in a channel. For example, `/cls 10` / `/cmd cls 10` will clear the 10
most recent messages in a channel.

This Slack app is intended to be used as a simple utility tool for prototyping
other Slack applications: while building Slack apps, your test channel (like #demo)
can rapidly fill with spam as you test out message formats and more. We recommend
installing this app primarily in development workspaces - please don't give
your entire production workspace the ability to destroy other people's messages!

## Example Usage

You can use this app by typing `/cls` or `/cmd cls` depending on how you
choose to deploy your Slack application. More on that below, in [Installation](#installation).

By default, the Slack `/cls` / `/cmd cls` command takes one argument: an integer
between 1 and 10. If an invalid value is provided, it will default to 1 and
the maximum number of lines you can remove is 10.

### Clear 1 Line

You can clear one line by typing `/cls` / `/cmd cls` or `/cls 1` / `/cmd cls 1`.

### Clear <= 10 lines

You can clear 5 lines by typing `/cls 5` / `/cmd cls 5`.

## Installation

You can install this Slack app to your workspace using [Standard Library](https://stdlib.com/).
Standard Library is an API and workflow development platform that automatically
(1) generates and hosts workflow code for you and (2) handles API authentication
to multiple app APIs (i.e. Slack, Stripe, Airtable) seamlessly with a single token.

When you're ready, you can click the button below to deploy the code immediately.
**You will be asked to configure your Slack application automatically as part
of the deployment process.**

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

### Slack App Configuration (Easy, 1 Step)

The easiest way to configure this Slack application is by installing the
official Standard Library slack application, which exposes a `/cmd` command.
Using this method will make the `cls` command available via `/cmd cls`.

The **deploy** button above will bring you to a screen asking to link your
Slack app.

## Making Changes

## Support

## Acknowledgements
