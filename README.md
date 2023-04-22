# Singtel Modile Coding Assignment

## Prerequisite

The following tools with corresponding versions were used to initialize this project.
Should you have issues building/running the app try to downgrade/upgrade to the specific version.

- VSCode 1.77.3
- Xcode 14.3
- Android Studio Electric Eel | 2022.1.1 Patch 1
- Node 16.10.0
- Ruby 2.7.8p225
- Cocoapod 1.12.0

## Installation

1. Clone the project
2. Run `yarn` to install dependencies
3. Go to the ios folder (`cd ios/`) and run `pod install`

## Running

Android:

```
yarn android
```

iOS:

```
yarn ios
```

## Contributing

Before raising a PR be sure to update snapshots and check for linting errors by running the respective commands locally:

```
yarn test -u
```

```
yarn lint
```

> **_NOTE:_** Remove once these are automated and CI is in place

## Deployment

Both Apple App Store and Google Play Store require app artifacts (ipa for iOS and apk/aab for Android) to be signed before they are uploaded to each platform. Both platforms have manual/local and cloud signing options available. As a prerequisite, developers are required to generate certificates to be used for signing.

> **_NOTE:_** iOS has a [cloud signing](https://developer.apple.com/help/account/create-certificates/cloud-managed-certificates) option and Android has [Play App Signing](https://developer.android.com/studio/publish/app-signing#app-signing-google-play) for automatically managing signing.

> **_Disclaimer:_** This section of the document only describes parts of the manual signing workflow. A fully detailed guide as well as checklists for [Android](https://developer.android.com/studio/publish) and [iOS](https://developer.apple.com/documentation/xcode/preparing-your-app-for-distribution) are linked. React Native themselves have also created their own guides for [Andoird](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key) and [iOS](https://reactnative.dev/docs/publishing-to-app-store).

### Manual

#### Key Generation

For Android this can be done locally using [`keytool`](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key) or [Android Studio](https://developer.android.com/studio/publish/app-signing#generate-key).

Unlike Android, Apple requires developers to be, or is part of a team that is, enrolled in Apple's Developer Program. That being said, once the developer's account has the correct role, creating a distribution certificate can be done either in [Xcode](https://help.apple.com/xcode/mac/current/#/dev154b28f09) or through the [developer portal](https://developer.apple.com/help/account/create-certificates/create-enterprise-distribution-certificates). Apart from the signing certificate, a provisioning profile is also required for signing ipa's. This can only be done in the [developer portal](https://developer.apple.com/help/account/manage-profiles/create-an-app-store-provisioning-profile) and once created can be synced in Xcode. This can also be managed automatically via cloud signing.

#### Building

For Android, simply go to the Android folder (`cd android`) and run `./gradlew bundleRelease`.
This will create an aab (Android App Bundle) inside `android/app/build/outputs/bundle/release` to be uploaded to Google Play Console.

For iOS, building is done via Xcode. Open the iOS workspace and go to `Product` -> `Archive`. Once archiving is complete, a window will pop-up showing the archive with an option to `Distribute App`. Clicking on the option will go through the workflow to upload to App Store Connect.

> **_IMPORTANT:_** There are configuration steps required to make sure both the iOS and Android projects are able to detect and use the generated signing certificates. These steps are outside the scope of this document.

#### Alternatives

Aside from the cloud signing and Play Store signing options, there are other tools readily available that will help automate the manual process described above. These tools are normally integrated into a continuous delivery (CD) pipeline. One of the most well known tools is [fastlane](https://fastlane.tools/). It is worth exploring this tool as it helps address common errors and issue that result from manual/local building.

## The Application

### Description

The app is word game puzzle where the user/player tries to guess the word being described given a set of letters.

### Assumptions

The developer assumed the following during development:

- The `Landing` screen will fetch more categories via an API and therefore the design will evolve.
- The user can only pick one category at a time.
- The `Leadboard` screen will fetch more leaderboards data via an API and the design will be available by that time. In the meantime only the current user will appear.

### Codebase

The app is developed using, as of this writing, the latest version of React Native (`0.71.6`) with the default Typescript template.

#### Overview

The entry point for code is in `src/app`. This is where all the screens and providers are contained into one application component. Speaking of providers, the app uses `redux` for it's app-wide state management. Moreover, `redux` is integrated into the codebase using `@reduxjs/toolkit` as [suggested](https://redux.js.org/introduction/why-rtk-is-redux-today) by `redux` themselves. This significantly simplifies implementation and lessens the boilerplate code needed from simply integrating `redux`. The entire app is divided into three screens: [`Landing`](src/screens/landing/index.tsx), [`Question`](src/screens/question/index.tsx), and [`Leaderboard`](src/screens/leaderboard/index.tsx).

#### Landing

The `Landing` screen is what the user will first see when opening the app. This is where the user can pick a category where the questions will come from. The user can also navigate to the `Leaderboard` screen to view their current score.

#### Question

The `Question` screen is where the actual game happens. This module has three important parts: the [`index`](src/screens/question/index.tsx), the [`useIndexer`](src/screens/question/hooks/useIndexer.tsx) hook and the [`useGameEngine`](src/screens/question/hooks/useGameEngine.tsx) hook . The `useIndexer` hook is responsible for fetching the selected category the user picked from the `Landing` screen as well as going through the list of questions and answers included in the category. These data are returned to the `index` for rendering and other game related logic. The `useGameEngine` hook is where the game logic resides. It is responsible for shuffling the answer's letters and keeps track of the selected and unselected letters. The `index` is what contains both hooks together to make the screen functional. The main reasoning in creating these parts (as well as other unmentioned parts) is to separate the game logic and allow easy testing and maintainability.

#### Leaderboard

The `Leaderboard` screen is where scores from other players are displayed as well as the current user's position. There is a share button at the bottom of the screen that shares the user's score to their preferred social media platform.

#### Code Coverage

The codebase has 92.9% code coverage. This can be verified by running `yarn test`.

#### Improvements

Here are some areas that can be improved:

- [x] Hide navigation header in `Landing` screen
- [x] Show selected category indicator
- [ ] Improve UX when guessing wrong in `Question` screen
- [ ] Ramp up code coverage to 100%
- [ ] Mock `shuffle.ts` in tests to prevent constantly updating snapshots
