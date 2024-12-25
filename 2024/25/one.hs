import Data.List (groupBy, partition, transpose)
import Data.Function (on)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise input =
  let (locks, keys) = partition isLock (getSchematics input)
      pairs = [(lock, key) | lock <- map convertLock locks, key <- map convertKey keys]
  in  length (filter keyFitsLock pairs)
  where
      getSchematics = filter (/= [""]) . groupBy ((==) `on` (/="")) . lines
      isLock (firstLine:_) = firstLine == "#####"
      convertLock = map (length . takeWhile (=='#')) . transpose . init . drop 1
      convertKey = map (length . filter (=='#')) . transpose . init . drop 1
      keyFitsLock (lock, key) = all (\(l,k) -> (l+k)<=5) (zip lock key)
