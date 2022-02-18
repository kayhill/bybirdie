import React from 'react';
import UserFormsContainer from '../containers/UserFormsContainer';

const Home = (props) => {
  return (
    <div class="">
      {props.loggedIn === true && (
        <div>
          <h2>Welcome back, {props.user.username}!</h2>
          <p>
            Need inspiration? Check out the notables section to see a list of
            unusual or <span>rare bird sightings</span> that have been reported
            near you in the last two weeks. Once you're ready, don't forget to
            begin a session and save all of the birds you spot today.{' '}
          </p>
          <p>Happy birding!</p>
          <button
            type="button"
            onClick={props.logout}
            className="btn waves-effect waves-light primary"
          >
            Log Out
          </button>
        </div>
      )}
      {props.loggedIn === false && (
        <div>
          <h2>Welcome</h2>
          <p>
            ByBirdie uses your location and data from the popular eBird platform
            to tell you exactly where to find the{' '}
            <span>best birding spots near you</span>. Whether you're a seasoned
            birder or new to the game, ByBirdie helps get you in the thick of
            the birdwatching action no matter where you are.
          </p>

          <p>
            Get even more functionality out of ByBirdie by creating an acount.
            You'll be able to <span>start a birdwatching session</span> and save
            all of the birds you see. On your history page, you can review all
            of the different birds you've spotted in locations around the world.
          </p>

          <UserFormsContainer
            status={props.status}
            register={props.register}
            login={props.login}
            user={props.user}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
