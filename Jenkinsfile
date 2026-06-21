pipeline {

    agent any

    environment {
        ACR_NAME = "janviacr2026"
        IMAGE_NAME = "genomics-detector"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Security Tests') {
            steps {
                dir('backend-node') {
                    sh '''
                        npm install
                        npm test
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=genomics_detector \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.token=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Push Images To ACR') {
            steps {
                sh '''
                    az acr login --name janviacr2026

                    docker tag genomics-detector-frontend \
                    janviacr2026.azurecr.io/genomics-detector-frontend:latest

                    docker push \
                    janviacr2026.azurecr.io/genomics-detector-frontend:latest
                '''
            }
        }
    }
}