pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = '43a41af6-da35-4097-b874-fbf0ee309c9d'
        KUBE_CONFIG_ID = '34339247-6224-417d-ab96-b007934ce1aa'
        IMAGE_BACKEND = 'krish141/kindergarden-app-backend:latest'
        IMAGE_FRONTEND = 'krish141/kindergarden-app-frontend:latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: '20c28591-b926-4222-80b5-847eb0630b73', url: 'https://github.com/krisheducation/kindergarden.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        sh """
                        docker build -t ${IMAGE_BACKEND} ./backend
                        docker push ${IMAGE_BACKEND}
                        docker build -t ${IMAGE_FRONTEND} ./frontend
                        docker push ${IMAGE_FRONTEND}
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBE_CONFIG_ID, serverUrl: 'https://172.31.17.207:6443']) {
                    sh 'kubectl apply -f k8s/deployment.yml'
                }
            }
        }
    }
}
