#!/usr/bin/env bash

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
cp example-.gitignore ${projectDir}'/.gitignore'
