**When to Give Feedback: Exploring Tradeoffs in the Timing of Design Feedback** \
Jane L. E*, Yu-Chun Grace Yen*, Isabelle Yan Pan, Grace Lin, Mingyi Li, Hyoungwook Jin, Mengyi Chen, Haijun Xia, and Steven P. Dow\
Creativity & Cognition 2024.

**Project Page**: https://ejane.me/inactionfeedback.html


The frontend service is based on [Polotno Studio](https://studio.polotno.com/). It is an [open-source SDK](https://github.com/polotno-project/polotno-studio) available to design customized editors. The platform is written in ReactJS and provides [documentation for its API usages](https://polotno.com/docs/overview). 
The design panels available on the left side are customizable.

## Prerequisites

1. Install [Firebase CLI](https://firebase.google.com/docs/hosting#implementation_path) for deployment.

2. Login to your Firebase account.

3. Install NPM dependencies.

    ```bash
    > npm install
    ```

4. Add [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to your editor.

## Set up Firebase

You need to make a Firebase project to run the app.
1. Create a new project in Firebase: https://firebase.google.com/.
2. Go to "Project Settings" next to the "Project Overview" on the Firebase page to get the "Project ID".
3. Add your Firebase project to the repo.
   - Go to `.firebaserc` and add your project. There is an existing template `"project_acronym": "firebase_project_id"`, replace the information based on your project. For example, `"action": "in-action-feedback-id"` where `"in-action-feedback-id"` is the Firebase "Project ID" and `"action"` is a project acronym of your choice.
4. Get the config information on Firebase.
   - Go to "Project Settings" and "Your apps" section, click the third icon to "Add Firebase to your web app". Click "Also set up Firebase Hosting" and register app. Then you can find `firebaseConfig` constant.
   - Find the template file in `src/configurations/configuration.ts` and update with your project's config information from `firebaseConfig`.
5. Update the Firebase key.
   - Copy the apiKey from `firebaseConfig` constant.
   - Go to `src/App.tsx` and replace `"apiKey"` with the key you just copied for your project.
6. Set up the Firestore Database.
   - Under "Build", find "Firestore Database" and create a new "production" database.
   - Go to "Rules" to update permissions to `allow read, write;`.

## Running the app

Now you should be able to run your program locally. 
1. Use the following command to run (replacing project_acronym with your own acronym defined in `.firebaserc`):
   ```bash
   > npm run start
   ```

2. To interact with the interfaces, open up the following links: \
   (1) http://localhost:3000/C?id=newID to create a new ID (replacing `"newID"` with the new ID for the user). Once the ID has already been created, the interface can be accessed via http://localhost:3000/design-feedback?id=existingID (again replacing with the appropriate ID). \
   Note that the first link must be used to CREATE a new ID before using the second one. \
   (2) http://localhost:3000/wizard (code in `wizard.tsx` and `DesignElements.tsx`) \
   (3) http://localhost:3000/admin (code in `admin.tsx`)

   These three links are for: (1) **the user interface**: designing and requesting feedback, (2) **the wizard interface**: providing feedback, and (3) **the admin/experimenter interface**: managing what/when feedback is published to the user.

## Deployment

You can also deploy your program and use the Firebase App to access it.

1. Use the following commands to deploy (replacing project_acronym with your own acronym):
   ```bash
   > rm -r ./build 
   > npm run build
   > firebase use project_acronym
   > firebase deploy --only hosting
   ```
   If this doesn't work for you, try to re-add the project and deploy it:
      ```bash
      > firebase use --clear
      > firebase use --add
      ```
2. After the deployment, use the same links as above, replacing `localhost:3000` with `firebase_project_id.web.app`.
