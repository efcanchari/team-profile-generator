## Multiple Git accounts

### How to configure multiple bitbucket accounts
Official doc:
https://support.atlassian.com/bitbucket-cloud/docs/managing-multiple-bitbucket-user-ssh-keys-on-one-device/

Go to ~/.ssh
```
cd ~/.ssh
```

There create your ssh following next example
```
ssh-keygen -t ed25519 -b 4096 -C "<username@emaildomain.com>" -f <ssh-key-name>


# example 
ssh-keygen -t ed25519 -b 4096 -C "frank.lapa@symovetech.com" -f id_github_bootcamp
```


Add the credentials to ssh config
```
ssh-add ~/{ssh-key-name}

#example
ssh-add ~/id_rsa_efcanchari
```

clone a repository using specific account
```
git clone git@github.com-{bitbucket_username}:{workspace}/{repo}.git
```

#example
```
git clone github.com-efcanchari:efcanchari/team-profile-generator.git
```


Update url, if you already have cloned the repo
```
git remote set-url origin git@github.com-{bitbucket_username}:{workspace}/{repo}.git

#example
git remote set-url origin git@github.com-efcanchari:efcanchari/team-profile-generator.git
```

### config file
File Name: ~/.ssh/config
```
Host bitbucket.org-frank_lapa_wiqu
   HostName bitbucket.org
   IdentityFile ~/.ssh/id_rsa
   IdentitiesOnly yes

Host bitbucket.org-franklapa
   HostName bitbucket.org
   IdentityFile ~/.ssh/id_jenkins_rsa
   IdentitiesOnly yes


Host bitbucket.org-frank_lapa_symovetech
   HostName bitbucket.org
   IdentityFile ~/.ssh/id_rsa_symovetech_laptop
   IdentitiesOnly yes

Host git.bootcampcontent.com
   HostName git.bootcampcontent.com
   User franklapa
   IdentityFile ~/.ssh/id_bootcamp
   IdentitiesOnly yes

Host github.com-efcanchari
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_github_bootcamp
   IdentitiesOnly yes
```

### Clone GitLab bootcamp code
Clone code
```
git clone git@git.bootcampcontent.com:uk-edx-16-week/UK-VIRT-FE-PT-11-2023-U-LOLC-1.git
```