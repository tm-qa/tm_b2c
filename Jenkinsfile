pipeline {
    agent any

    environment {
        BASE_URL = 'https://www.turtlemintinsurance.com/'
        PINCODES = '400001,110001,560001'
        CI = 'true'
        NODE_OPTIONS = '--max-old-space-size=4096'
    }

    tools {
        nodejs 'NodeJS-18+'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npx playwright --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium firefox webkit'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Type Check') {
            steps {
                sh 'npm run typecheck'
            }
        }

        stage('Generate Tests from Excel') {
            steps {
                sh '''
                    if [ -f "../Turtlemint_Old_Test_Cases_Updated_Format.xlsx" ]; then
                        cp ../Turtlemint_Old_Test_Cases_Updated_Format.xlsx ./test-data.xlsx
                        npm run parse:excel
                        npm run generate:tests
                    else
                        echo "Excel file not found, skipping test generation"
                    fi
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'
            }
        }

        stage('Generate Reports') {
            steps {
                sh '''
                    if [ -d "allure-results" ]; then
                        npx allure generate allure-results -o allure-report --clean
                    fi
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, allure-report/**, test-results/**, test-data.json, duplicates-report.csv', fingerprint: true, allowEmptyArchive: true
            
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
        }
        success {
            echo '��� All tests passed!'
        }
        failure {
            echo '��� Some tests failed. Check reports for details.'
        }
        unstable {
            echo '������ Tests unstable. Check reports for details.'
        }
    }
}