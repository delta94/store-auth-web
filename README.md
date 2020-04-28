# Qilin Store Auth Web

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/qilin/store-auth-web.svg?branch=master)](https://travis-ci.com/qilin/store-auth-web)

Qilin is an open-source digital distribution platform for game developers and publishers. Our mission is to distribute games by minimizing the effort of contracting, sharing documentation and providing comprehensive real-time statistics.

Our solution is a part of Protocol One IAAS and is actively used in the Storefront constructor. Qilin can be used as a component in an existing P1-independent system, using its hardware or cloud platforms.

**Qilin architecture schema**

![Qilin architecture schema](qilin-schema.png)

**Store Auth Web** is an authentication frontend application written in React for [Qilin Store](https://github.com/qilin/store-web).

## Features

- Authenticate Qilin Store users.

---

## Table of Contents

- [Usage](#usage)
- [Deployment](#deployment)
- [Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run the application in the development mode:

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Deployment

Build the app for production to the `build` folder:

`yarn build`

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running Tests

Launch the test runner in the interactive watch mode:

`yarn test`

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## 

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. 
This command will remove the single build dependency from your project.

`yarn eject`

> **Note:** this is a one-way operation. Once you `eject`, you can’t go back.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. Learn more about [ejecting](https://create-react-app.dev/docs/available-scripts/#npm-run-eject).

## Contributing, Feature Requests and Support

If you like this project then you can put a ⭐ on it. It means a lot to us.

If you have an idea of how to improve Qilin (or any of the product parts) or have general feedback, you're welcome to submit a [feature request](../../issues/new?assignees=&labels=&template=feature_request.md&title=).

Chances are, you like what we have already but you may require a custom integration, a special license or something else big and specific to your needs. We're generally open to such conversations.

If you have a question and can't find the answer yourself, you can [raise an issue](../../issues/new?assignees=&labels=&template=support-request.md&title=I+have+a+question+about+%3Cthis+and+that%3E+%5BSupport%5D) and describe what exactly you're trying to do. We'll do our best to reply in a meaningful time.

Qilin welcomes contributions from anyone and everyone. Please refer to [our contribution guide to learn more](CONTRIBUTING.md).

## License

The project is available as open source under the terms of the [Apache-2.0 License](https://opensource.org/licenses/Apache-2.0).