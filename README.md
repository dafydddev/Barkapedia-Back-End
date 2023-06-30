# Barkapedia-Back-End

Barkapedia is a lifestyle web app that enables users to find safe spaces to walk their dogs. Written in Typescript (built using 5.1.3). Otherwise, the project uses:

* cors (built using 2.8.5)
* express (built using 4.18.2)
* firebase-admin (built using 11.9.0)
* firebase (built using 9.22.2)
* husky (built using 8.0.3)
* jest-sorted (built using 1.0.14)
* jest (built using 29.5.0)
* node-geocoder (built using 4.2.0)
* supertest (built using 6.3.3)
* ts-jest (built using 29.1.0)
* ts-node (built using 10.9.1)
* types/cors (built using 2.8.13)
* types/express (built using 4.17.17)
* types/jest (built using 29.5.2)
* types/node-geocoder (built using 4.2.1)
* types/node (built using 20.3.0)
* types/supertest (built using 2.0.12)

The above versions can be considered the minimal supported versions. In practice, earlier versions may work, however I advise making sure that you are using at least the above to avoid issues.

## Hosting

This server is hosted via render and is available [https://nc-be-games-puql.onrender.com](https://barkapedia-back-end.onrender.com/).

## Front End

This front end is hosted on GitHub with the [Barkapedia Front End repository](https://github.com/dafyddhenke/Barkapedia-Front-End/).

## Setup 

The project uses Firebase. More specifically, the "nc-parks". This is confirmed in the `.firebaserc` file. If you are using your own Firebase server, you will need to update this document. For example:

```
{
  "projects": {
    "default": "nc-parks"
  }
}
{
  "projects": {
    "default": "your-project-name"
  }
}
```

You will need to generate a `ServiceAccount.json`. This will allow you to interact with the Firebase databse. For more information, see [Google Firebase - Admin Setup](https://firebase.google.com/docs/admin/setup). Place this in the root directory.

As well, you will need to make sure that have the email and password sign in method enabled. For more information, see [Google Firebase - Authenticate with Firebase using Password-Based Accounts](https://firebase.google.com/docs/auth/web/password-auth)

## Running Locally 

For testing purposes, it is suggested that you use the [Firebase Emulation Suite](https://firebase.google.com/docs/emulator-suite/install_and_configure), which will enable you to debug the database locally.

The database can be seeded using the `runSeed.ts` file. For example, `ts-node db/seed/runSeed.ts`. 

This will default to seeding the local, emulated databse. It will only attept to seed the productoin database if you manually set your `NODE_ENV` to be `production`.

To get everything working locally:

1. start the Firebase emulators (using Firestore and Firebase Auth) using `firebase emulators:start`.
2. start the local server using `ts-node listen.ts`.
3. seed the database with `ts-node db/seed/runSeed.ts`.

This is easier done by having some terminal windows in the background, if you don't want to clutter your VSCode window. 
