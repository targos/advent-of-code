main = do
  stdin <- getContents
  print (solveExercise stdin)

solveExercise :: String -> Int
solveExercise stdin = foldr (\line sum -> sum + checkEquation line) 0 (lines stdin)

-- Gets a string in the format "result: a b ..."
checkEquation :: String -> Int
checkEquation equation =
  let
    (test, _:_:values) = break (==':') equation
    testInt = read test :: Int
  in
    if testInt `elem` combineValues values then testInt else 0

combineValues :: String -> [Int]
combineValues values =
  let splitValues = map read (words values) :: [Int]
      operations = [(index, operator) | index <- [1..(length splitValues - 1)], operator <- [(+), (*)]]
  in []
