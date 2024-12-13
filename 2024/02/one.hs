import Data.List (transpose, sort)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise :: String -> Int
solveExercise = length . filter isReportSafe . map parseLine . lines
  where parseLine = map read . words

isReportSafe :: [Int] -> Bool
isReportSafe all@(a:b:_)
  | a==b = False
  | a<b  = isMonotonicSafe (<) all
  | a>b  = isMonotonicSafe (>) all

isMonotonicSafe :: (Int -> Int -> Bool) -> [Int] -> Bool
isMonotonicSafe comparator [a,b] = isPairSafe comparator a b
isMonotonicSafe comparator (a:b:rest)
  | isPairSafe comparator a b = isMonotonicSafe comparator (b:rest)
  | otherwise                 = False

isPairSafe :: (Int -> Int -> Bool) -> Int -> Int -> Bool
isPairSafe comparator a b = (a `comparator` b) && (1 <= absDiff) && (absDiff <= 3)
  where absDiff = abs (a - b)
