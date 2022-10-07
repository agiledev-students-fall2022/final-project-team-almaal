# Guide to Contributing

## Code Contribution Guideline 

Step 1. **Create or select a branch**
    - Start the PR by first locating a branch that you will be working on. You can either create a new branch if your PR is exploring a new feature, or you can directly contribute your code to an existing open branch. In most cases, a new branch should be created from the default `main` branch. Name your branch in format of `yourname/featurename`. You don't have to create a new branch every time you work on a PR. The convention is that each branch focuses on a specific area or topic.
    - Some useful commands in the terminal:

    $ git branch wenbo/user_login     (create the branch named 'junyao/user_login')

    $ git checkout wenbo/user_login   (switch to the branch)

    $ git checkout main                (switch back to the main branch)
    
    $ git branch                       (list all open branches)

Step 2. **Create a pull request** by clicking `New` button on the `Pull requests` tab.
    - Name the PR based on what it does. The title should be concise yet descriptive. 
    - In the PR, describe what the current problems are, how far you have gone through, what subtasks you plan to work on. Include a before-after screenshort if the change is significant for the frontend.

Step 3. **Commit your code under the pull request**

Committing your code means that you're submitting your code for review process. Technically you can submit as many times as you want. However, it's recommended that you commit at non-trivial stages to keep your commit path reasonably clean. For example, you are working on a task to implement an algorithm that incurs changes to three files `A.py`, `B.md`. To commit your code, first stage all files only related to this task. Use the command line 

    $ git add A.py B.md

Pay attention to specifying the file directory when staging multiple files. An easier way to stage them is to click on plus sign `+` by the file name in the `Source Control (Ctrl + Shift + G G)` [for vscode users](https://code.visualstudio.com/docs/editor/versioncontrol#:~:text=the%20current%20workspace.-,Commit,-%23). 

Second, write a commit message that provides resaonble granualrity that others can understand why you make the changes. Explain any side effects you've observed or other unintuitive consequences of this change. In the message body, 

 After this step, your commit is only visible at your local repo. `push` your local commit to the remote branch by 

    $ git push 
  
Please push freqeuntly especially if you're collaborating with others on the same branch; otherwise, you may might encounrage [merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts). Conversely, pull frequently if multiple people are working on the same branch in the same period of time, so that you can sync. 
About [`rebase`](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) 

From time to time, the `main` branch will be updated. When code conflicts happen between your code and `main` branch code, you may want to rebase your branch onto the `main` branch. You dont want to rebase the code that you have shared (`push`) with others. Only code that has not been shared may need to be rebased.

Step 4. **Pend the approval from reviewers**

In your PR messages, ping the reviewers to merge your code to the `main` branch. The reviewers may request code changes for benefits of merging. If your code is ready to merge, the reviewers will merge your code when everything looks good..
