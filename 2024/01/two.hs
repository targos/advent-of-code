import Data.List (transpose, sort)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise :: String -> Int
solveExercise input =
  let
    left:right:_ = (transpose . map parseLine . lines) input
  in
    sum (map (\num -> num * getCount num right) left)
  where
    parseLine line = map read (words line) :: [Int]
    getCount num list = length (filter (==num) list)
