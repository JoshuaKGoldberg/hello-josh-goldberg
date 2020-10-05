# Workshop Steps

Hi!
This file details the steps we're taking to create this kind of open source repository.
It itself wouldn't typically exist in a repository, but everything else you see has been added commit-by-commit in the same order as the steps.

## Requirements

To get your computer ready, make sure you've installed:

* [Git](https://git-scm.com)
* [Node](https://nodejs.org/en/download)

You'll also need accounts on:
* [GitHub](https://github.com)
* [npm](https://npmjs.com)

> If you haven't yet installed the right software and created those accounts, you'll want to start that now.

I personally use [VS Code](https://code.visualstudio.com/download) as a text editor, but you can use whatever you'd like.

## Goals

By the end of this workshop, the physical actions you will have taken will include:

1. [Open Source](#open-source): The basic tenants of what "open source" means.
2. Setting up an open source package:
    1. [Git and GitHub](#git-and-github)
    2. [Markdown](#markdown)
    3. [Licensing](#licensing)
    4. [Node](#node)
    5. [npm](#npm)
    6. [Badges](#badges)
    7. [Bin](#bin)
    8. [Dependencies](#dependencies)
    9. [Exports](#exports)
3. Setting that package up for the community to interact with it:
    1. [Issues](#issues)
    2. [Labels](#labels)
    3. [Pull Requests](#pull-requests)
    4. [Code of Conduct](#code-of-conduct)
4. [Co-Maintenance](#co-maintenance)
5. [Motivations](#motivations)
6. [Protips](#protips)
    1. [Contributor Protips](#contributor-protips)
    1. [Maintainer Protips](#maintainer-protips)

The really important behavioral takeaways here, I believe, are around interacting with open source projects and their developers & maintainers online.
We'll spend a good chunk of time at the end over good _(and bad!)_ etiquette, with examples, to understand how open source software is maintained and how best to contribute meaningfully.

> We'll be using Node.js and JavaScript, but the concepts are pretty common across many major languages and runtimes.

## Open Source

Let's start off with the basics: _what is open source?_
What does this all mean?

In a _literal_ sense, "open source" refers to making the _source files_ of a project visible to the public.
This is most commonly achieved by storing the code in a publicly accessible service such as bitbucket.com or github.com.
Services like those two allow us to put copies of our projects online so others can see it.

> Open source is often associated with _software_, but can also refer to other forms of projects, such as _hardware_.

In a _practical_ sense, open source _also_ often refers to the _culture_ and _ecosystems_ around making code visible to the public.
Hundreds of thousands of projects are available on the internet and allow virtually anybody to report bugs, request features, and submit code contributions.
Many of those projects are even _developed in the open_: meaning decisions around their development are made with community input.

Much of the software you're using _right now_ on your computer are open source or based on open source.
It's a big deal.

## Git and GitHub

Most of today's open source projects are set up as open source using two major projects:

* **Git**: Software to create and manage "repositories", or collectsions of files with detailed histories of changes and versions.
* **GitHub**: A website that hosts Git repositories, along with useful development features for collaborating on them.

To be super clear: _Git_ is open source software and _GitHub_ is a company adn service providing offerings built on Git.
They're not the same thing.

### GitHub

We're going to each create a repository on GitHub to play around in.
GitHub repositories are available in your browser by visiting a page like `https://github.com/{user}/{repository}`: for example, I've created mine at `https://github.com/JoshuaKGoldberg/hello-your-name`.

1. Create yours under your own username and your name by going to https://github.com/new.
2. Give it a name starting with `hello-` followed by your name, with `-` hyphens instead of spaces.
3. Give it whatever description you'd like and don't bother checking off any of the boxes; we'll set those up later.
4. Click the green **Create repository** button at the bottom of the form and _tada!_, you've created a GitHub repository!

> It should have a message on the screen starting with _"Quick setup — if you’ve done this kind of thing before"_.

When we say GitHub "hosts" your repository, what we really mean is that GitHub keeps a saved version of your code and its Git metadata _(read: file history)_ stored online.
Its web interface will let you look at the code at various points in time.

GitHub also provides security around repositories by only allowing authorized users to make changes to them.
Follow the instructions on [GitHub's "Creating a personal access token" docs](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) to set up a "PAT" that we'll use in later steps for authentication.

### Git

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/ddd3dcc5739feecfc8dc07e2b019a7f007ee109c)

Git will provide us with the software tools to "push" new code versions to the repository stored by GitHub.
To start, we'll need to set up a local copy of the repository so we can work in it.

Create a new directory somewhere on your computer using your command prompt / terminal / whatever-your-operating-system-calls-the-shell with the same name as the repository.

* In Mac and Linux, I personally prefer a path like `~/repos/hello-your-name`.
* In Windows, I personally prefer a path like `C:/Code/hello-your-name`.

Navigate to that directory in your shell, the copy and run the command-line instructions under _"...or create a new repository on the command line"_ one line at a time.
They should look something like:

```shell
echo "# hello-your-name" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YourUsername/hello-your-name.git
git push -u origin main
```

_(but with `YourUsername` and `hello-your-name` replaced with your own values)_

If Github asks you for a username and password, use your username from github.com and the PAT you created in the last section as the password.

> If your copied `origin` command used a `git@` url instead of `https://`, you might need to use your actual GitHub password instead of a PAT.
> I strongly recommend using the `https://` URL and a PAT instead, for security.

In order, here's what they do:

1. `echo "# hello-your-name" >> README.md`: This creates a new file, `README.md`, with a single line of text as its contents. We'll learn more about this file next.
2. `git init`: Sets the directory up as a Git repository by creating a `.git` folder to store its history of file changes.
3. `git add README.md`: Tells Git that the `README.md` file we created should now be tracked as part of the repository.
4. `git commit -m "first commit"`: Tells Git to create a new "commit", or changeset, in the repository containing all file changes we've `git add`ed: in this case, the creation of `README.md`.
5. `git branch -M main`: Tells Git that the main version of our code will be referred to as `main`. We'll talk more about branching later.
6. `git push -u origin main`: This actually does two things:
    1. Tells Git that we'd like to call the GitHub-hosted copy of the repository `origin`.
    2. Pushes our `main` branch from our localy computer up to the GitHub servers.

The end result of all these commands will be that there are now _two_ versions of your repository:

* **"Local"**: The directory stored on your local computer.
* **"Origin"**: The directory stored on the GitHub servers.

The rest of this workshop will involve making changes to the _local_ repository and _pushing_ them to the _origin_.
Each of those pushes will contain one or more _commits_, which are descriptions of file changes at a point in time.

If you visit your repository on GitHub in your browser, you should now see a page showing the contents of your `README.md`.
That's your repository! 

## Markdown

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/b32cedeff8ad860650bcc4a1de128053f24c0d54)

That `README.md` ("read me") file we created is an informal standard in software.
It's the starting page users will see when visiting a repository, so it generally contains:

* The name of the repository
* A short description of the repository's purpose
* How to use the repository's code _(or links to those docs)_
* How to contribute to the repository _(or links to those docs)_

Markdown is a language for creating these kinds of documentation text files.
Markdown files are typically stored with the `.md` extension.
GitHub supports a variation of Markdown called "GitHub Flavored Markdown".

> 👉 GitHub docs: [Mastering Markdown](https://guides.github.com/features/mastering-markdown).

It uses special characters to show differences in text formatting such as `_` _(italic)_ and `**` _(bold)_ , and allows simple embedded HTML for advanced contents.
The `#` character is used to show that a line is a top-level heading of the page.
Modify your README.md contents from storing the exact name of the repo in the heading into something a little more friendly looking:

```diff
- # hello-your-name
+ # Your Repo Name 🙌
```

Paste your description in there too and add some italic and/or bold font.
Mine looks like:

```md
# Hello, Josh Goldberg! 💖

A sample package written by me, Josh Goldberg, to practice working in open source software.
_Hooray!_
```

> If you want to see some more examples of Markdown formatting, this file is itself written in Markdown.
> Meta!

Now that we've made some changes to our local files, we'll want to store them in a Git commit in our local repository and push that commit to the origin.

1. Run this command to tell Git we'd like to make a commit with our `README.md` changes:

    ```shell
    git add README.md
    ```

2. Run this command to preview in your terminal what changes are ready to be committed:

    ```shell
    git diff
    ```

    This command isn't strictly necessary, but I like previewing changes before making them to be sure I'm not doing anything bad accidentally.

3. Run this command to create a commit with your changes:

    ```shell
    git commit -m "Use fancier formatting in README.md"
    ```

    That `-m` flag tells Git to label the commit with a _message_ describing the commit's changes.

4. Run this command to copy ("push") the new commit from your local repository to the one stored on GitHub ("origin"):

    ```shell
    git push
    ```

    Now that Git already knows the `origin` repository's `main` branch is where to send changes from this local repository's `main` branch, we don't need any kind of `-u` flag or similar.
    We can run `git push` to tell the GitHub repository about our new commits.

## Licensing

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/b6aa96f9fa19f3200a47414ea27f270a9fea9940)

Let's take a break from coding a little bit.

The term "Free Open Source Software", or FOSS, is another one you may see online a lot.
It refers to software that is both _open source_ and _freely licensed_.
Free licensing means anybody can run, copy, distribute, study, change and improve the software.

> 👉 Free Software Foundation: [What is free software?](https://www.gnu.org/philosophy/free-sw.html)

> "Free software" is a matter of liberty, not price.
> To understand the concept, you should think of "free" as in "free speech," not as in "free beer".
> We sometimes call it "libre software," borrowing the French or Spanish word for "free" as in freedom, to show we do not mean the software is gratis.

The situations under which a project might permit anybody to use it are laid out in the project's _license_.
Licenses typically require some combination of:

* Asserting the project's authors have no legal responsibility for the code's usage
* Requiring users provide some kind of attribution to the original project
* Requiring users release their usage or changes under equivalent licenses

<details>
<summary>For this sample project, we'll use the very popular and very simple <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a></summary>
<pre>
<code>
Copyright (c) 2020 Your Name Here

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</code>
</pre>
</details>

Copy that into a new `LICENSE.md` your repository, replacing _`Your Name Here`_ with your actual name.
Then, create a new commit with this file addition and push it to the origin:

```shell
git add LICENSE.md
git commit -m "Added MIT license"
git push
```

Now, if you visit your repository on GitHub, a couple of new things show up:

* Under the right-hand side of the page, it should say `⚖ MIT License`.
* A `LICENSE.md` file is listed before `README.md` in the list of files.

If you click on the `LICENSE.md` file name, it'll bring you to a page describing the MIT license before the contents of the file.

> YourUsername/hello-your-name is licensed under the
> MIT License
> A short and simple permissive license with conditions only requiring preservation of copyright and license notices.
> Licensed works, modifications, and larger works may be distributed under different terms and without source code.

Software licensing is a big, tricky subject with a lot of Very Strong Opinions.
I won't delve into it here and generally don't understand it particularly well.

## Node

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/10f9af3183dc4352640f8d799c2876746f11cb30)

Back to writing code!
Node.js, or just "Node", is a wildly popular (and open source!) way to run JavaScript code on demand.
We'll be writing _(read: copy & pasting)_ small amounts of JavaScript code in our repository.

Create an `index.js` file with contents that pass a friendly message in a string to the `console.log` function _(with your name instead of mine)_:

```js
console.log("Hello! It's me, Your Name!");
```

You should now be able to run that `index.js` file using the `node` command-line to print out the friendly message:

```plaintext
> node index.js
Hello! It's me, Your Name!
```

Create a commit with this file addition and push it to the origin:

```shell
git add index.js
git commit -m "Created friendly index.js logger"
git push
```

## npm

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/0cb5e2a202126511a20f6a80fee0e5bc4e7ea073)

In JavaScript software land, a "package" refers to a shareable set of files -generally JavaScript- that can be shared and used in other projects.
Node Package Manager, or "npm", refers to a couple pieces of software that come along with using packages in Node:

* The npm registry: a publicly accessible listing of all packages.
* The `npm` command-line: a tool to manage projects' interactions with other packages.

We're going to make our project into a package so that other people can consume it as users.

Create a `package.json` file with contents like the following _(with your own name and description substituted in)_:

```json
{
  "author": "Your Name",
  "description": "A sample package written by me, Your Name, to practice working in open source software. Hooray!",
  "keywords": ["hello", "your name", "open source"],
  "license": "MIT",
  "main": "index.js",
  "name": "hello-your-name",
  "version": "0.0.1"
}
```

This metadata file is a description of how this package should appear to the npm registry and other users seeking to interact with it.
A few relevant fields that matter are:

* `"license"`: The MIT license we chose above, explaining how this must be used.
* `"main"`: The starting JavaScript code file to be run when using this package.
* `"name"`: What name to list this package on in the npm registry.
* `"version"`: `major.minor.patch` version of the package, which will increase whenever we want to publish an updated version to the npm registry.

Send this file addition as a commit to the origin repository:

```shell
git add package.json
git commit -m "Added package.json"
git push
```

We'll also want to publish this package to the npm registry.
Log in on the npm cli using its [`adduser` command](https://docs.npmjs.com/cli/adduser) with the username, password, and email you signed up for on [npmjs.com](https://npmjs.com).:

```shell
npm adduser
```

Once you're authenticated, you should be able to use its `publish` command to add your package to the npm registry.

```shell
npm publish
```

That command should output a bunch of lines of metadata prefixed with `npm notice`, then a line like:

```shell
+ hello-your-name@0.0.1
```

> This will fail if someone else has already claimed that package name on the npm registry.
> That's ok!
> Keep changing the `"name"` field in your `package.json` and retrying `npm publish` until you find a name not yet taken.

Once the publish succeeds, you'll be able to visit the npm registry's listing for your package at a URL like `https://www.npmjs.com/package/hello-your-name`.

## Badges

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/24ff6b5bd3d0d2ab28c73941a35e492820296387)

`README.md`s are often decorated with cute little "badge" images showcasing the code integrations and released packages of the project.
These badge images can be auto-generated from external services to keep up-to-date.

Add this line with empty lines before and after it to your `README.md` between the top-level title heading and description sentence(s) _(excluding the `+ `, and substituting in your package name)_:

```md
[![NPM version](https://badge.fury.io/js/hello-your-name.svg)](http://badge.fury.io/js/hello-your-name)
```

`badge.fury.io` is a helpful service to generate an image for us with the package name and latest registry version number.

It's also a good idea to tell the npm registry what the link to our GitHub repository source is, so add the following field to the `package.json`:

```json
"repository": "https://github.com/YourUsername/hello-your-name"
```

Package these changes up as a commit and push them to the origin repository, using the `-A` flag to include all changed files:

```shell
git add -A
git commit -m "Cross-linked npm and GitHub"
git push
```

We'll also increase ("bump") our package version using the `npm version patch` command, which creates a Git commit increasing the version in `package.json`:

```shell
npm version patch
npm publish
git push
```

If you refresh the npmjs.com view of your package, you'll see those two changes:

* The right column in the page now lists its GitHub repository as both its _Homepage_ and _Repository_.
* The package description has badge image still showing `0.0.1` for the version... but that'll eventually update to `0.0.2`.

## Bin

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/91020d0d603d609eb0c1bb4b334502a140b7fe90)

We've created a repository and corresponding npm package, but we haven't set up how users are meant to run our code.
We're going to set our app up as a command-line client (CLI) that runs `index.js`.

npm ships with an `npx` command that, given a package name, installs the package if necessary, then runs runs the package.

Try opening a new terminal session in a different directory on your computer and running your package name with `npx`:

```shell
npx hello-your-name
```

You should get output like:

```plaintext
npx: installed 1 in 2.541s
command not found: hello-your-name
```

We need to define the file to execute when someone tries to run our package.
In `package.json`, add a `"bin"` section:

```json
"bin": {
    "hello-your-name": "bin/hello-your-name"
}
```

Create a new `bin/` directory in the repository and a file with the same name as the package (so, the same full path as that command) and contents like:

```js
#!/usr/bin/env node

require("../index");
```

> Make sure the created file has _no_ file extension at all: not even `.js` or `.txt`.

You can verify this all worked by running that bin file with Node in the terminal session still in this repository:

```plaintext
> node bin/hello-your-name
Hello! It's me, Your Name!
```

Package these changes together as a Git commit and npm version bump:

```shell
git add -A
git commit -m "Added bin command"
git push
npm version patch
npm publish
git push
```

Now, when you try to run the package from another directory, it should install the new version and print the friendly message:

```plaintext
> npx hello-your-name
npx: installed 1 in 3.57s
Hello! It's me, Your Name!
```

Great!
Not only have you created a GitHub repository and npm package, you've made the package available to other people to run it.

## Dependencies

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/58f8295f4a295fe67b75cafff19afdf66655d97c

Running packages through `npx` is a nice and direct way to run code, but most packages are consumed using their Node API: meaning as one JavaScript file importing code from another.
Before we set our code up to do that, let's look at how we can import another package to reuse its code.

Taking on a _dependency_ on another package allows us to use its code in our project.
There are two general steps:

1. Add it to our formal list of npm package dependencies
2. Import the package's code in our code

We'll take a dependency on the popular package [`chalk`](http://npmjs.com/package/chalk), which provides useful methods for colorizing terminal output.

### Installing a Dependency

In the repository's terminal, run this command to add it to your dependencies in `package.json`:

```shell
npm install chalk
```

You might notice a few changes happen:

* `package.json` is given a new `dependencies` section with a `"chalk"` set to some version.
* A `node_modules/` directory is created containing directories such as `chalk`.
* A new `package-lock.json` file is created describing a bunch of package names with metadata fields.

The `node_modules/` directory isn't something we need to care about for our own source code, so create a new `.gitignore` file with a single line to tell Git we will never want to care about its contents:

```plaintext
node_modules/
```

The `package-lock.json` file, on the other hand, is a useful file to commit to our repository: it indicates what version of each of `chalk`'s dependencies we're now using.
If someone else developing on this repository runs `npm install` again, npm will know to use the versions indicated in `package-lock.json`.

### Importing a Dependency

Change your `index.js` contents to wrap the message string with a call to `chalk.green` after creating a `chalk` variable equal to `require("chalk")`:

```js
const chalk = require("chalk");

console.log(chalk.green("Hello! It's me, Your Name!"));
```

That `require` call is how Node knows to retrieve the contents of the `chalk` package, which we then store in the `chalk` variable.
The `chalk` package happens to provide ("export") a `green` function that formats a string to indicate to a terminal that it should be colored green when printed.

You can verify this is all working by running `index.js` with `node` again:

```plaintext
> node index.js
Hello! It's me, Your Name!
```

Package these changes together as a Git commit and npm version bump:

```shell
git add -A
git commit -m "Added chalk for green text"
git push
npm version patch
npm publish
git push
```

When you run `npx hello-your-name` in the other terminal, it should now print as green.

## Exports

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/e46a21f796d6b0df50171c35b20471da60d7524d)

We're going to want to provide a function for someone to import in Node and run the same way `chalk` exports a `green` function.
That means there will now be _two_ possible ways someone could consume our package:

* As a CLI app, such as through `npx`
* Importing its code as JavaScript objects in a JavaScript file

> It's important to think of how you want your package consumers to work with your code.
> Someone importing a function in the JavaScript file probably wouldn't want it to log the message until that function is called.

We're going to make our `index.js` export a function that logs when called:

```js
const chalk = require("chalk");

module.exports.hello = () => {
    console.log(chalk.green("Hello! It's me, Your Name!"));
};
```

...and change our bin file to call that function:

```js
#!/usr/bin/env node

require("../index").hello();
```

### Usage Documentation

It's also important to think of what kind of information your package consumers will need to know in order to use your package.
Our `README.md` doesn't yet give _any_ information on how to use the package.
Now's a good time to fill that out.

Usage documentation often goes under a sub-heading like `## Usage`, which then explains how to import the package and run the code.
Since we have two ways of being run, we'll want two sections under it:

    ## Usage

    `hello-your-name` can either be run directly as a command-line app or as functions imported by other code.

    ### CLI

    ```shell
    npx hello-your-name
    ```

    ### Node API

    ```js
    const { hello } = require("hello-your-name");

    hello();
    ```

More advanced packages will typically provide more text alongside the code snippets to explain inputs and outputs, expected ways to use the package, and other useful tidbits.

Package these changes together as a Git commit and npm version bump:

```shell
git add -A
git commit -m "Added Node API with usage docs"
git push
npm version patch
npm publish
git push
```

## Issues

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/6f5e9f3396d45dae81c8e6629e07179f84ec7a30)

You've created your package and set it up to be used by other people over the internet.
No matter how simple or thought out your code is, someone will eventually point out something they'd like changed with it.

One of GitHub's core features on top of Git repository hosting is its _issue tracker_: where repositories can file the list of bug reports, feature requests, and other requested changes on the repository. 

To both package _consumers_ and repository _maintainers_, these issues are the backbone of your project's planned future.
Developing in the open means placing the planned work items for your project in some public issue tracker, and most of the time that means GitHub issues.

We can go to the Issues tab on the repository's GitHub page at its `/issues` URI and see the list of issues (so far, none).
We can also click the big green _"New issue"_ button to start the process of filing a new issue on ourselves... but let's hold off on that until we think more deeply on what we'd want to say.

### Issue Templates

As a repository maintainer, you'll generally want issues filed on the repository to provide enough information to make informed decisions about what to do about them.
GitHub allows providing templates in your repository that nudge users to use when filing issues.
These are _tremendously_ useful in making issues informative enough to take action on.

Create a `.github/ISSUE_TEMPLATE` directory in your repository and add two files to it:

<ul>
<li>
<details>
<summary><code>bug_report.md</code></summary>
<pre>
<code>
---
name: Bug Report
about: Report a general bug in hello-your-name
---

<!--
👋 Hi, thanks for filing an issue on hello-your-name! 💖
Please fill out all fields below to ensure your issue is addressed.

If your issue doesn't provide enough info to fully explain or reproduce your bug, it will be closed. 😦
-->

### 🐛 Bug Report

-   `hello-your-name` version: X.X.X
-   Node version: X.X.X

#### Actual Behavior

<!-- What is the behavior right now? -->

#### Expected Behavior

<!-- What are the specific changes you'd like to see? -->

#### Reproduction

<!-- Please paste a code snippet, Gist, repository link, or other means of reproducing your error here. -->
</code>
</pre>
</details>
</li>
<li>
<details>
<summary><code>feature_request.md</code></summary>
<pre>
<code>
---
name: Feature Request
about: Request a new feature or enhancement be added
---

<!--
👋 Hi, thanks for filing an issue on hello-your-name! 💖
Please fill out all fields below to ensure your issue is addressed.

If your issue doesn't provide enough info to fully explain your proposed feature, it will be closed. 😦
-->

### 🚀 Feature Request

<!-- General description of what you'd like to see changed. -->

#### Existing Behavior

<!-- What is the behavior right now? -->

#### Change Proposal

<!-- What are the specific changes you'd like to see? -->
</code>
</pre>
</details>
</li>
</ul>

Send those files up as a new Git commit:

```shell
git add -A
git commit -m "Added issue templates"
git push
```

Now, when you go to GitHub Issues tracker for the repository and click _"New issue"_, it brings you to a selection screen to pick which template to start with.

For the sake of practice, let's file a feature request on the repository asking for a brigher green on its _`Hello!`_.

## Labels

If you end up with a lot of issues on your repository, it can be hard to keep track of all of them.
GitHub allows issues to be tagged with any number of _labels_ describing the issues in some way.

You can find a repository's label inventory at its `/labels` URI.
We actually don't have to do much here; repositories receive a set of common labels to choose from by default.

Personally, I always rename `help wanted` to `accepting prs`, since it's a little more clear that it means we could accept code changes ("pull requests") fixing a labeled issue.
More on what those are soon.

Since we just filed an issue, let's add `accepting prs` and `enhancement` labels to it.

## Pull Requests

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/c87a3503c36a2e64582fa8c8d62da84cdc49ea88)

Pull Requests are GitHub's way of allowing code changes from different _branches_ (versions) of a repository to be _pulled_ into a main version.
They're based on the concept of a Git branch, which is how Git allows you to create and switch between multiple versions of a repository.

> Git branches can be hard to figure out at first.
> If this isn't making sense, that's ok!

### Pull Request Templates

Before sending a pull request ("PR") to fix the issue, we'll want to set up a template for users to fill out their PR descriptions with.
These work like the issue templates in nudging contributors to start off with them.

<details>
<summary>Create a file at <code>.github/PULL_REQUEST_TEMPLATE.md</code> with the contents.</summary>
<pre>
<code>
<!--
👋 Hi, thanks for sending a PR to hello-your-name! 💖
Please fill out all fields below to ensure your PR is reviewed quickly.
-->

## PR Checklist

-   [ ] Addresses an existing issue: fixes #00
-   [ ] That issue was marked as [`accepting prs`](https://github.com/YourUsername/hello-your-name/labels/accepting%20prs)

## Overview

<!-- Brief description of what is changed and how the code change does that. -->
</code>
</pre>
</details>

Asking users to fill out the PR description template will help make sure they are indeed trying to fix issues that have been labeled as ready to accept a PR, and not just spamming you with unwanted code changes.

Package this into a Git commit and send it up to the origin:

```shell
git add -A
git commit -m "Added PR template"
git push
```

### Sending Pull Requests

We'll want to try to work on the feature request we just filed, so let's create a new Git `bright-green-hello` branch in our local repository to work on instead of `main`:

```shell
git checkout -b bright-green-hello
```

Now change `index.js` to use `chalk`'s `brightGreen` function on specifically the `"Hello!"`:

```js
const chalk = require('chalk');

module.exports = () => {
    console.log(chalk.greenBright("Hello!"), chalk.green("It's me, Your Name!"));
};
```

Package this into a Git commit and send it up to the origin, specifying the (to-be-created) server branch as a new `bright-green-hello`:

```shell
git add -A
git commit -m "Used bright green for hello"
git push -u origin bright-green-hello
```

The output from the last command should include a few extra lines this time, including a couple like:

```plaintext
remote: Create a pull request for 'bright-green-hello' on GitHub by visiting:
remote:      https://github.com/YourUsername/hello-your-name/pull/new/bright-green-hello
```

Visiting that URL takes you to a page to set a title, fill out a description, and send a pull request.
Be sure to properly check off the two items in the template and fill in the issue number!

```md
-   [x] Addresses an existing issue: fixes #1
-   [x] That issue was marked as [`accepting prs`](https://github.com/YourUsername/hello-your-name/labels/accepting%20prs)
```

Once you send the pull request, GitHub will see the `#1` and know that this PR and that issue are linked.
Merging the pull request will automatically close the issue.

### Updating Branches

Merging a PR is a way of telling GitHub that you'd like the changes from _one_ branch to be pulled into _another_ branch on their server-hosted repository.
The PR we just went was asking for changes in their `bright-green-hello` branch to be put onto their `main` branch in the form of a commit.

That means our local repository's `main` branch is now out-of-date: it doesn't have that last commit from the result of merging the PR.
We should switch back to the `main` branch, pull in the new changes locally, and publish a new version:

```shell
git checkout main
git pull
npm version patch
npm publish
```

Creating branches and sending PRs instead of directly commiting to `main` might seem like unnecessary overhead: especially when we're the only one working on a repository.
But there are some key advantages to them at scale:

* They give you an opportunity to review code before it's committed: both when working with other people and even when working alone.
* When you're contributing to a repository you don't maintain, you might not have permissions to create or push to their branches, and might need to create a copy of their entire _repository_ to send pull requests between.
    * This is called _forking_, and is the norm for contributing to other repositories.

## Code of Conduct

> 🔖 [Reference commit](https://github.com/JoshuaKGoldberg/hello-josh-goldberg/commit/92d9ccd7d086993d84db1f7f43fe54e1d57f89a8)

The internet is a wild and terrifying place, and some of the people on it are evil.
Others are misguided, malignant, or otherwise seemingly abrasive individuals to work with.

Many open source projects find themselves needing to create a "code of conduct" its users pledge to adhere to.
We can create that now as a precaution for later.

<details>
<summary>Copy this text into a new <code>.github/CODE_OF_CONDUCT.md</code> file.</summary>
<pre>
<code>
# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

## Scope

This Code of Conduct applies within all project spaces, and it also applies when
an individual is representing the project or its community in public spaces.
Examples of representing a project or community include using an official
project e-mail address, posting via an official social media account, or acting
as an appointed representative at an online or offline event. Representation of
a project may be further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at support@codecademy.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq
</code>
</pre>
</details>

This file is from a popular shared "contributor covenant" that, in short, summarizes people interacting in this project will be kind and respectful towards each other.

```shell
git add -A
git commit -m "Added code of conduct"
git push
```

## Co-Maintenance

All right!
We've created a repository, set it up as a published package, and resolved an issue in it with a pull request.
That's the basic flow of project maintenance.

To reinforce the process so far, I'd encourage you to talk to another participant after this workshop and get the URL to their repository so you can:

1. File an issue on their repository
2. Wait for them to add an `accepting prs` label on that issue
3. Create a branch to address fix the issue
4. Send a PR to their repository to fix the issue
5. Have them merge that PR in

### Cloning a Repository

In order to perform the step 3 of creating a branch for a repository, you'll need to have a local version of that repository.
You already have one for _your_ repository from steps in the beginning of the workshop.

To set up a local repository for _another_, already-existing GitHub repository:

1. Create a new terminal session in the parent directory of your other local repository (e.g. `~/repos/` or `C:/Code/`).

2. "Clone" their repository, navigate into that directory, and prepare it for development:

    ```shell
    git clone https://github.com/TheirUsername/hello-their-name
    cd hello-their-name
    npm install
    ```

> Alternately, you could [fork their repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo), which would make another repository.
> I find it's easier to understand Git at first without forking.

### Collaborators

In order to perform the step 4 of sending a PR in another person's repository, they'll need to first add you as a "collaborator" on that repository.
The repository's owner can do so by visiting their repository's `/settings/access` URI and clicking the _"Invite a collaborator"_ button.
(Alternately, this is under the repository's _Settings_ > _Manage access_.)

## Motivations

I want to take a brief interlude here to talk about _why_ people contribute to or even maintain open source libraries.
While there are some projects that are partially or largely funded by major companies, such as React and TypeScript, most open source projects don't regularly interact with money.

Some work on open source because it's a good way to build skills: like regularly visiting the gym, but for improving your software development skills instead of getting swole.

Some work on open source because they feel a moral push to: that improving the base technology used by thousands to millions improves the development speed of us as a species.

Some work open source because the projects and/or people are cool, and they think it's fun.

_(Personally, I'm all of the above...)_

If this stuff is of interest to you, ask yourself: _why_?
Of all the great reasons to work in open source, what's motivating you, and how can you keep that motivation strong?

## Protips

The rest of this file is a series of protips about conducting yourself online.
For each of the examples here, I encourage you to think about where each person in the interaction is coming from, and how the other person's actions make them feel.

A lot of issues over the internet are at least partially caused by difficulty in seeing the other side's point of view.
We don't have facial expressions or known shared experiences to draw on when talking to someone over GitHub, so it can be hard to assume positive intent on their end.
But, assuming positive intent is _crucially important_ 

> Always assume positive intent in open source!

### Contributor Protips

#### Don't Spam

Before we get into any kind of always-useful tips, I feel compelled to mention the ridiculous Hacktoberfest spam that's come out on the internet the last week.
Don't be a jerk.

https://blog.domenic.me/hacktoberfest/ <- https://github.com/whatwg/html/pulls?q=is%3Apr+is%3Aclosed+label%3Aspam

#### Follow the Templates

Repository maintainers set up nice issue templates for a reason.
They want to interface with you in a particular way because that's what's most efficient for them.
_Not_ following an issue template slows down that interaction -- and often means leaving out information that the maintainer needs to understand the issue.

https://github.com/palantir/tslint/issues/4308

From another perspective: good issues should have enough information to be useful _and_ not so much information that it spams the maintainers.

#### Respect the Project

It's easy to barge into a repository with high hopes for somthing you think _needs_ to happen.
I constantly see people _demanding_ some feature be implemented or bug be fixed in a certain way without understanding why the code is the way it is.
Be respectful of the (likely considerable) time and effort maintainers put into the libraries.

https://github.com/microsoft/TypeScript/issues/32614
https://github.com/microsoft/TypeScript/issues/13002

#### Keep StackOverflow on StackOverflow

It's tempting to post directly in a project's GitHub issue tracker when your code isn't working and you don't know why.
But that's not often the right place for it.

Many projects prefer external services such as Discourse or StackOverflow be used because they're more tailored to answering help questions.
Polluting a repository's issue tracker with _"help I can't get it to work"_ issues makes it harder to maintain that repository.

https://github.com/facebook/react/issues/17854
https://github.com/facebook/react/issues/17860

### Maintainer Protips

#### Be Courteous

Nobody likes working with a curmudgeon, especially if they're trying to donate time to help with you, and _especially_ if they're trying to report a bug or needed feature of your code.
Present a polite, friendly demeanor to people on GitHub and you'll have much more friendly, production interactions.
"Please", "thank you", and happy emojis go a long way towards making the tone of a comment nicer.

Compare:
* Gruff tone on my part: https://github.com/palantir/tslint/issues/975#issuecomment-435610089
* Friendly tone on my part: https://github.com/palantir/tslint/pull/4685#pullrequestreview-232619512

#### Reduce Barriers to Entry

None of the people who come across your project have the same depth of understanding around it that you do.
If you'd like to attract people to use or even contribute to it, find ways to reduce the "barriers to entry" (difficulties users would have to overcome):

* Write descriptive docs in README.md and other files, and keep them up to date
* Organize your issues and labels so it's clear which are good for first timers
* Keep a clean, understandable codebase so new folks can read through it easily

#### The Pit of Success

The ["Pit of Success"](https://blog.codinghorror.com/falling-into-the-pit-of-success) refers to making it harder to do the wrong thing than the right one.
For programming, that means making the most common, easy choices for your users the ones you want them to take.
Issue and PR templates are a good example: when the description is already filled out for you, why bother deviating?

We didn't cover it in the technical workshop for time, but automated formatters, linters, and tests are a _huge_ part of keeping a repository clean.

* **Formatters**: Tools such as [Prettier](https://prettier.io) that enforce a single code formatting style.
* **Linters**: Tools such as [ESLint](https://eslint.org) that detect likely errors or other non-trivial style issues in code syntax.
* **Tests**: Tools such as [Jest](https://jestjs.io) that execute portions of your code and assert the results are what's expected.

I highly recommend using all three of these in any repository spanning more than a couple source code files.
GitHub allows blocking PRs from being merged until these checks all pass on the branch.
Check any pull request of any repository with them set up to see them in action.

https://github.com/typescript-eslint/tslint-to-eslint-config/pulls

#### Organize It!

A well organized issue tracker is an incredibly useful tool for long term maintenance of a repository.
I personally like assigning each issue each of the following kinds of labels:

* `area`: What part(s) of the project it touches
* `status`: Whether it's ready, waiting on something, or declined
* `type`: What kind of issue this is, such as bug, feature, etc.

https://github.com/typescript-eslint/tslint-to-eslint-config/issues

## Next Steps

Thank you for making it this far in the repository/workshop!
You now have a bit of practical experience creating and updating an open source repository.
I'd encourage you to take this experience into the wild: such as by publishing some code you've written as open source and/or contributing to other people's open source projects.
