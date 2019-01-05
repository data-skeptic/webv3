import React from 'react';

// AWS Amplify
import Amplify from 'aws-amplify';
import awsmobile from 'Src/aws-exports';
Amplify.configure(awsmobile);
import { withAuthenticator } from 'aws-amplify-react'

const withAuth = withAuthenticator;

export default withAuth;