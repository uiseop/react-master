# .env파일
- `REACT_APP_`으로 시작해야지 create-react-app에서 참조 가능
- 띄워쓰기는 허용하지 않음.`(주의)`

# Firebase와 연동
firebase는 빠르고, 쉽게, 백엔드를 만들어주기때문에 간단한 프로젝트를 진행하기에 좋다.
`백엔드`를 만들어 준다. -> DB생성, DB조작 API제공, 회원가입, OAuth등등 많은 기능을 제공해줘. 
일일히 뚜따뚜따 만들지 않아도 돼.

## 그럼 어떻게 써?
`firebase`어플리케이션을 만든 후, KEY를 받아와야지. KEY를 받아오고 
```javascript
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```
이처럼 `초기화`를 시켜준 뒤, 만든 app에 대한 접근 권한을 가져와. export `auth`한걸로 모든 `firebase`앱에 접근할 수 있는것이지.