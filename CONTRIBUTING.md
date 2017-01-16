Contributing
============

**Thank you for considering contributing to this project!**

Before you doing so, **please read the following simple steps** on how to 
contribute. This will **make life easier and help to avoid wasting time**
on things, which are not requested.

Discuss the changes before doing them
-------------------------------------

 - First of all, **open an issue in the repository** 
   [**using the bug tracker**][1] **and describe the contribution** you would 
   like to make, the bug you found or any other ideas you have. This will help 
   to get you started on the right foot.
   
 - **If it makes sense**, add the platform and software information 
   *(e.g.: operating system, Node.js version etc.)* and/or screenshots 
   so we can see what you are seeing.
 
 - It is recommended to **wait for feedback before continuing** to the next 
   steps. However, if the issue is clear *(e.g.: a typo)* and the fix is 
   simple, you can continue and fix it.

Fixing issues
-------------

 - Fork the project in your account and **create a branch with your fix** using
   this naming style: **some-awesome-feature** or **some-issue-fix**.

 - Commit your changes in that branch. Make sure you follow 
   [**StandardJS**][2] and that the **tests ran without errors**:
   
   ```bash
   # Checks the coding style
   npm run check

   # Checks that everything is all right
   npm run test-pr
   ```
   
 - In **package.json**, add yourself to the [**array of contributors**][3]
   *(if the array doesn't exist, create it)*:
 
   ```json   
   {
      "contributors": [
         "Your Name <your.mail@email.com> (http://your.website)"
      ]
   }   
   ```
 
Creating a pull request
-----------------------

 - Open a pull request and **reference the initial issue** 
   [**in the pull request message**][4] *(e.g.: fixes #)*. 
   Write a **good description and title**, so everybody will know 
   what is fixed/improved.

 - **If it makes sense**, add screenshots, gifs, etc., so it is easier to see
   what is going on.

Wait for feedback
-----------------

**Your contributions will be reviewed before accepting them.**
You may get feedback about what should be fixed/changed in your modified code.

THANK YOU!
----------

 [1]: https://github.com/atjse/load-svg-file/issues
 [2]: https://standardjs.com/
 [3]: https://docs.npmjs.com/files/package.json#people-fields-author-contributors
 [4]: https://blog.github.com/2013-05-14-closing-issues-via-pull-requests/
