import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import { getAllQuestions } from './Questions/actions';
import { getAllAnswers } from './Answers/actions';

import './index.css';
import './App.css';

import App from './components/App';
import Answers from './Answers/containers/List'
import containers from './Questions/containers/Pages'

// import { EntityPage } from './CRUD/Generics/EntityPage';
import { StudentPage } from './CRUD/Student/StudentPage';

import './formik/formikStyles.css';
import { css } from 'glamor';
import { COLORS } from './formik/theme';
const { base, black, ...cols } = COLORS;

// Cool example colors.
Object.keys(cols).forEach(color => {
	css.global(
	  `.formik-example.formik-example--${color} button[type='submit'],
	.formik-example.formik-example--${color} button.primary`,
	  {
		 background: COLORS[color][5],
	  }
	);
	css.global(
	  `.formik-example.formik-example--${color} button[type='submit']:focus,
	  .formik-example.formik-example--${color} button.primary:focus`,
	  {
		 background: COLORS[color][6],
	  }
	);
	css.global(
	  `.formik-example.formik-example--${color} button[type='submit']:active,
	  .formik-example.formik-example--${color} button.primary:active`,
	  {
		 background: COLORS[color][7],
	  }
	);
 
	css.global(
	  `.formik-example.formik-example--${color} input:focus, .formik-example.formik-example--${color} select:focus`,
	  {
		 borderColor: COLORS[color][4],
		 boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 0 3px ${COLORS[color][1]}`,
		 outline: 'none',
	  }
	);
 });


interface IProps {
	store: Store<IAppState>;
}

const Root: React.SFC<IProps> = props => {
	return (
		<Provider store={props.store}>
			<Router>
				<nav>
					<ul>
						<li>
							<Link to="/">Supporter</Link>
						</li>
						<li>
							<Link to="/questions">Questions</Link>
						</li>
						<li>
							<Link to="/answers/pera">Answers</Link>
						</li>
						<li className="push-right">
							<Link to="/answers/pera">Sign In</Link>
						</li>
					</ul>					
				</nav>
				<div>
					<Switch>
						<Route exact path="/">
							{<App /> }
						</Route>
						<Route path="/questions">
							<containers.questions canEdit={true} />
						</Route>
						<Route path="/answers/:slug">
							<Answers />
						</Route>
						{/* <Route
							path="/blog2/:slug"
							render={({ match }) => {
								// Do whatever you want with the match...
								return <div>{match}</div>;
							}}
						/> */}
						<Route path="/crud">
							<StudentPage />
						</Route>
					</Switch>
				</div>	
			</Router>
		</Provider>
	);
};

// Generate the store
const store = configureStore();
store.dispatch(getAllQuestions());
store.dispatch(getAllAnswers());

// Render the App
ReactDOM.render(<Root store={store} />, document.getElementById(
  'root'
) as HTMLElement);