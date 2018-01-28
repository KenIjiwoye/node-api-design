# Node API design.

I was researching new ways to structure my api's to be more productive, organized, and user-friendly for myself as well as other developers.

### A few things to note...

- For my router, I did not use 'express.Router()'. Instead I used 'express-promise-router' to help in eliminating the repetitive usage of the "try-catch" block when using async/await.

Instead of this:

         index: async (req,res,next) => {
            try {
                const users = await User.find({});
                res.status(200).json(users);
            } catch (err) {
                next(err);
            }
        }

What you'll see is this:

        index: async (req,res,next) => {
                const users = await User.find({});
                res.status(200).json(users);
        }


- I use Joi for validation. You can find the logic for this in the 'routeHelpers.js' file.