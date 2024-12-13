import Data.List (transpose, sort)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise :: String -> Int
solveExercise = length . filter isAnyReportSafe . map parseLine . lines
  where parseLine = map read . words

isAnyReportSafe :: [Int] -> Bool
isAnyReportSafe report = any isReportSafe (report:truncatedReports)
  where
    truncatedReports = [removeElemAt i report | i <- [0..(length report - 1)]]
    removeElemAt i report = let (left, right) = splitAt i report in (left ++ tail right)

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
