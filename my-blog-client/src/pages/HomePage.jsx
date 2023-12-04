const HomePage = () => (
  <>
    <h1 className="home-title">Hello, welcome to my blog!</h1>
    <p>
      My name is Ethaniel Amorim and this is a project developed under the course "React: Creating and Hosting a Full-Stack Site" 
      by Shaun Wassel on LinkedIn Learning, a short course where it was taught how to create a front-end application,
      a back-end for it, how to integrate Firebase Auth and Admin SDK to it, and how to host it using Google Cloud.
    </p>

    <p>
      This project was created solely for practicing the content given in the course and it has no other purpose to be hosted than
      to verify its functionalities. Feel free to look around, but you won't find anything useful here (not yet, maybe someday). 
    </p>

    <p>
      If you're curious about the authentication feature, you can also try it and create you own account with a fake email, I swear it's safe (it was
      made with Firebase Auth, a Google service where I don't have access to any user information other than if it exists or wheter it's logged in or not).
    </p>
  </>
);
export default HomePage;