// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const connectFirebase = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyD761v6RMfX79SWk1-BU3sv_Y7tQA0DmCQ",
      authDomain: "ethamorim-blog.firebaseapp.com",
      projectId: "ethamorim-blog",
      storageBucket: "ethamorim-blog.appspot.com",
      messagingSenderId: "573484627032",
      appId: "1:573484627032:web:0919bf20a10491500a862d",
      measurementId: "G-PF254SRSLZ"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
};