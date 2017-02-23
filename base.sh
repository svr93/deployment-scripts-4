#!/usr/bin/env bash

currentDir=$(pwd)

# default project name
projectName='__new-project__'

while [[ "$1" != '' ]]; do
    case $1 in
        -name )                     shift
                                    projectName=$1
                                    ;;
        * )                         echo 'Error: bad param'
                                    ;;
    esac
    shift
done

projectDir='../'${projectName}
mkdir ${projectDir}
mkdir ${projectDir}'/client'

clientSrcDir=${projectDir}'/client/src'
mkdir ${clientSrcDir}

cp example-.gitignore ${projectDir}'/.gitignore'

cd ${projectDir}
npm init

cd ${currentDir}
