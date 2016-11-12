#!groovy

/*
The MIT License

Copyright (c) 2015-, CloudBees, Inc., and a number of other of contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

properties([[$class: 'GitLabConnectionProperty', gitLabConnection: 'git-diff-mx']])

node('jnlp-slave') {

    currentBuild.result = "SUCCESS"

    print "Build Is Starting for ${env.BUILD_TAG}"

    try {

       stage('Checkout') {

            sh 'kubectl version'

            checkout scm
       }

       stage('NPM Install') {
            gitlabCommitStatus("build") {
                env.NODE_ENV = "development"

                sh 'node -v'
                sh 'npm prune'
                sh 'npm install'
            }
       }

       stage('Test') {
            gitlabCommitStatus("test") {
                env.NODE_ENV = "test"
                sh 'npm test'
            }
       }

       switch (env.BRANCH_NAME) {
            case 'master':
                 stage('Build Frontend') {

                      env.NODE_ENV = "production"
                      sh 'npm run build'
                 }

                 stage('Build Docker') {

                      sh 'npm prune --production'

                      sh '$(aws ecr get-login --region=us-east-1)'

                      docker.withRegistry("https://541790730179.dkr.ecr.us-east-1.amazonaws.com") {
                          docker.build("sees-earth:${env.BUILD_TAG}").push()
                      }
                 }

                 stage('Deploy Docker') {
                      sh "kubectl set image deployment/sees-earth sees-earth=541790730179.dkr.ecr.us-east-1.amazonaws.com/sees-earth:${env.BUILD_TAG} --namespace=gigantic-computer"
                      sh 'kubectl rollout status deployment/sees-earth --namespace=gigantic-computer'
                 }
       }

    }

    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'xxxx@yyyy.com',
            replyTo: 'yyyy@yyyy.com',
            subject: 'project build failed',
            to: 'zzzz@yyyyy.com'

        throw err
    }

}
