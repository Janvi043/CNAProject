pipeline {
agent any

```
environment {
    AZURE_ACR_NAME = 'pipeline {
agent any

```
environment {
    AZURE_ACR_NAME = 'janviacr2026'
    IMAGE_NAME_FRONTEND = 'opendevops-nyctaxiweb-frontend:v1.0.0'
    IMAGE_NAME_BACKEND = 'opendevops-nyctaxiweb-backend:v1.0.0'
    ACR_LOGIN_SERVER = "${AZURE_ACR_NAME}.azurecr.io"
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build Frontend & Backend') {
        steps {

            dir('frontend-react') {
                sh 'docker build -t ${IMAGE_NAME_FRONTEND} .'
                sh 'docker tag ${IMAGE_NAME_FRONTEND} ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            }

            dir('backend-node') {
                sh 'docker build -t ${IMAGE_NAME_BACKEND} .'
                sh 'docker tag ${IMAGE_NAME_BACKEND} ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'
            }

        }
    }

    stage('Push Image') {
        steps {
            script {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'jenkins-acr-scope-map-cred',
                        usernameVariable: 'ACR_USER',
                        passwordVariable: 'ACR_PASS'
                    )
                ]) {

                    sh """
                        docker login ${ACR_LOGIN_SERVER} -u \$ACR_USER -p \$ACR_PASS
                        docker push ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}
                        docker push ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}
                    """
                }
            }
        }
    }

    stage('Deploy') {
        steps {

            sh 'docker pull ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            sh 'docker pull ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'

            sh 'docker ps -a'

            sh 'docker stop frontend || echo "No frontend container running"'
            sh 'docker stop backend || echo "No backend container running"'

            sh 'docker rm -f frontend || echo "No frontend container to remove"'
            sh 'docker rm -f backend || echo "No backend container to remove"'

            sh 'netstat -tuln | grep 8000 || echo "Port 8000 is free"'
            sh 'netstat -tuln | grep 3000 || echo "Port 3000 is free"'

            sh 'docker run -d --name frontend -p 8000:80 ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            sh 'docker run -d --name backend -p 3000:3000 ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'

            sh 'docker ps'
        }
    }
}
```

}
'
    IMAGE_NAME_FRONTEND = 'opendevops-nyctaxiweb-frontend:v1.0.0'
    IMAGE_NAME_BACKEND = 'opendevops-nyctaxiweb-backend:v1.0.0'
    ACR_LOGIN_SERVER = "${AZURE_ACR_NAME}.azurecr.io"
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build Frontend & Backend') {
        steps {

            dir('frontend-react') {
                sh 'docker build -t ${IMAGE_NAME_FRONTEND} .'
                sh 'docker tag ${IMAGE_NAME_FRONTEND} ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            }

            dir('backend-node') {
                sh 'docker build -t ${IMAGE_NAME_BACKEND} .'
                sh 'docker tag ${IMAGE_NAME_BACKEND} ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'
            }

        }
    }

    stage('Push Image') {
        steps {
            script {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'jenkins-acr-scope-map-cred',
                        usernameVariable: 'ACR_USER',
                        passwordVariable: 'ACR_PASS'
                    )
                ]) {

                    sh """
                        docker login ${ACR_LOGIN_SERVER} -u \$ACR_USER -p \$ACR_PASS
                        docker push ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}
                        docker push ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}
                    """
                }
            }
        }
    }

    stage('Deploy') {
        steps {

            sh 'docker pull ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            sh 'docker pull ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'

            sh 'docker ps -a'

            sh 'docker stop frontend || echo "No frontend container running"'
            sh 'docker stop backend || echo "No backend container running"'

            sh 'docker rm -f frontend || echo "No frontend container to remove"'
            sh 'docker rm -f backend || echo "No backend container to remove"'

            sh 'netstat -tuln | grep 8000 || echo "Port 8000 is free"'
            sh 'netstat -tuln | grep 3000 || echo "Port 3000 is free"'

            sh 'docker run -d --name frontend -p 8000:80 ${ACR_LOGIN_SERVER}/${IMAGE_NAME_FRONTEND}'
            sh 'docker run -d --name backend -p 3000:3000 ${ACR_LOGIN_SERVER}/${IMAGE_NAME_BACKEND}'

            sh 'docker ps'
        }
    }
}
```

}
