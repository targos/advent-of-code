import Data.List
import Data.Maybe

main = do
  input <- getContents
  print (solveExercise input)

solveExercise = sum . concatMap (filter isInvalid . expandRange . splitRange) . getRanges

getRanges :: String -> [String]
getRanges = filter (/= ",") . groupBy (\a b -> a /= ',' && b /= ',')

splitRange :: String -> (Int, Int)
splitRange range = (read before, read (tail after))
  where
    (Just index) = elemIndex '-' range
    (before, after) = splitAt index range

expandRange :: (Int, Int) -> [Int]
expandRange (a, b) = [a .. b]

isInvalid :: Int -> Bool
isInvalid value = isRepeat (show value)

isRepeat :: String -> Bool
isRepeat value = any (hasRepeat value) possible
  where
    lengths = [1 .. (length value `div` 2)]
    possible = filter (\l -> length value `mod` l == 0) lengths

hasRepeat :: String -> Int -> Bool
hasRepeat value len = value == concat (replicate (length value `div` len) (take len value))
