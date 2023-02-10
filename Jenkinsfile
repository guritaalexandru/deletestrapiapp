pipeline {
  agent any
  stages {
    stage('Build & Archive') {
        when {
            branch 'main'
        }
        steps {
            sh 'docker build \
                -t strapi1 .'
            sh 'docker save strapi1 | gzip > strapi1.tar.gz'
            stash includes: 'strapi1.tar.gz', name: 'strapi1.tar.gz'
        }
    }

    stage('Upload to S3') {
        options {
            withAWS(credentials: 'AWS_CREDENTIALS', region: 'eu-central-1')
        }

        when {
            branch 'main'
        }

        agent {
            docker { image 'amazon/aws-cli:latest' }
        }

        steps {
            unstash 'strapi1.tar.gz'
            s3Delete(bucket: 'jenkins-pipeline-artifacts-gdm', path: 'strapi1-artifacts/')
            s3Upload(file: 'strapi1.tar.gz', bucket: 'jenkins-pipeline-artifacts-gdm', path: 'strapi1-artifacts/')
        }
    }

    stage('Deploy') {
        agent any

        when {
            branch 'main'
        }

        steps {
            withCredentials([
              sshUserPrivateKey(credentialsId: 'StrapiDev-Key', keyFileVariable: 'KEYFILE'),
              file(credentialsId: 'StrapiDev-Env', variable: 'VARFILE')
            ]) {
            sh '""ssh -tt -i $KEYFILE ubuntu@3.74.242.104 \
                "rm -rf strapi1 && \
                mkdir strapi1 && \
                cd strapi1 && \
                aws s3 sync s3://jenkins-pipeline-artifacts-gdm/strapi1-artifacts . && \
                docker rm -f strapi1 || true && \
                docker image rm -f strapi1 || true && \
                docker image load -i strapi1.tar.gz && \
                docker run --env-file ./$VARFILE -d --name strapi1 --restart always -p 1337:1337 strapi1" ""'
        }
      }
    }
  }
}
