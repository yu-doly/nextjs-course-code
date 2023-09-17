import { useRef, useState } from 'react';

function HomePage (props) {
  const [feedbackItems, setFeedbackItems] = useState([]); 

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler (event) {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => console.log(data));
  }

  function loadFeedbackHandler () {
    fetch('/api/feedback').then(res => res.json())
      .then(data => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Email Address</label>
          <textarea id='feedback' rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}

// export function getStaticProps() {
//   const featuredPosts = getFeaturedPosts();

//   return {
//     props: {
//       posts: featuredPosts,
//     },
//   };
// }

export default HomePage;
