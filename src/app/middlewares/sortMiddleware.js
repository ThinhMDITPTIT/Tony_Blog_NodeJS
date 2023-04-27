module.exports = function softMiddleware (req, res, next) {
    // res.locals is an object that contains response  local variables scoped to the current request
    // => Therefore available only to the view(s) rendered during that request / response cycle
    // This property is useful for exposing request-level information such as the request pathname, authenticated user, user settings and so on
    res.locals._sort = {
        enabled: false,
        type: "default",
    };

    if (req.query.hasOwnProperty("_sort")) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;

        // Used to merge 2 objects
        // If have same key, merge them from right to left
        Object.assign(res.locals._sort, {
          enabled: true,
          type: req.query.type,
          column: req.query.column,
        })
    }
    next();
};
