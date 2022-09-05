# auth0-m2m-poc

## API
1. Create the API

- Go sidebar > *Applications* > *API*
- Click ***Create API***
- Fill the form to create the API and give it a nice **identifier**
  <img width="690" alt="Capture d’écran 2022-08-31 à 18 12 07" src="https://user-images.githubusercontent.com/10728426/187727803-ae7efcb7-4ccc-4e2b-b423-2fd8f835f2ac.png">

2. Create API scopes
- Inside the new API page, go *Permissions* tab
- Create two permissions : `update:bear` and `remove:bear`
  <img width="1078" alt="Capture d’écran 2022-08-31 à 18 19 10" src="https://user-images.githubusercontent.com/10728426/187729216-ddc9659a-25bb-4383-aa31-d645e8613f33.png">

3. Configure API
- Check [api env reference file](api/src/env/index.ts)
- Create a .env accordingly in the root of */api*

## Client App
1. Create and authorize the App

- Go sidebar > Applications > Applications
- Click "Create Application"
- Fill the form to create the Client
  - Select ***Machine to Machine Application***
    <img width="819" alt="Capture d’écran 2022-08-31 à 18 21 23" src="https://user-images.githubusercontent.com/10728426/187729271-91d9a178-86e7-4043-ae75-70881cbf5468.png">
  - Select your freshly created API
    <img width="815" alt="Capture d’écran 2022-08-31 à 18 23 39" src="https://user-images.githubusercontent.com/10728426/187729699-59bc2dc4-d1f0-4e60-bde6-46fe45b5e9fa.png">
  - And authorize **ONLY `update:bear` scope**
    <img width="816" alt="Capture d’écran 2022-08-31 à 18 23 48" src="https://user-images.githubusercontent.com/10728426/187729869-1c052ea5-faa9-4f5f-8f84-08b89e564f3d.png">

2. Configure App
- Check [app env reference file](app/src/env/index.ts)
- Create a .env accordingly in the root of */app*
