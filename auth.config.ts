import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUserSession,
  ICognitoUserPoolData,
  ICognitoUserData
} from 'amazon-cognito-identity-js';

// Configuring Cognito User Pool
const userPool = new CognitoUserPool({
  UserPoolId: process.env.COGNITO_POOL_ID!,
  ClientId: process.env.COGNITO_CLIENT_ID!,
});

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialProvider({
      id: 'email-login',
      name: 'email-login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const userData: ICognitoUserData = {
          Username: credentials.email as string,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);
        const authDetails = new AuthenticationDetails({
          Username: credentials.email as string,
          Password: credentials.password as string,
        });

        try {
          return await new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
              onSuccess: (result) => {
                const token = {
                  name: credentials.email as string,
                  accessToken: result.getAccessToken().getJwtToken(),
                  refreshToken: result.getRefreshToken().getToken(),
                  idToken: result.getIdToken().getJwtToken(),
                  accessTokenExpires: result.getAccessToken().getExpiration()* 1000,
                };
                resolve(token);
              },
              onFailure: (err) => {
                reject(new Error(`Authentication failed: ${err.message}`));
              },
            });
          });
        } catch (error) {
          // console.error('Error during authentiasdcation:', error);
          // throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any, user: any }) => {
      if (user) {
        return {
          ...user,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          idToken: user.idToken,
          accessTokenExpires: user.accessTokenExpires ,
        };
      }
      // return token;
      console.log(Date.now())
      console.log(token.accessTokenExpires);
      console.log((Date.now() < token.accessTokenExpires));
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return null
      // return refreshCognitoToken(token);
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.idToken = token.idToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
};

const refreshCognitoToken = (token: any) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: token.name as string,
      Pool: userPool,
    });

    const refreshToken = new CognitoRefreshToken({
      RefreshToken: token.refreshToken as string,
    });

    cognitoUser.refreshSession(refreshToken, (err, session: CognitoUserSession) => {
      if (err) {
        console.error('Error refreshing token:', err);
        return reject(err);
      }
      resolve({
        ...token,
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        accessTokenExpires: session.getAccessToken().getExpiration(),
      });
    });
  });

export default authConfig;