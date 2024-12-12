import Data.List (transpose, sort)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise :: String -> Int
solveExercise input =
  let
    left:right:_ = (transpose . map parseLine . lines) input
  in
    sum (zipWith absDiff (sort left) (sort right))
  where
    parseLine line = map read (words line) :: [Int]
    absDiff a b = abs (a - b)
