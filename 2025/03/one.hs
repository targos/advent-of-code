main = do
  input <- getContents
  print (solveExercise input)

solveExercise = sum . map findJoltage . lines

findJoltage :: String -> Int
findJoltage bank = dozen * 10 + unit
  where
    digits = map (\d -> read [d]) bank
    (dozenIndex, dozen) = ifoldl (\i (prevI, prevV) v -> if v > prevV then (i, v) else (prevI, prevV)) (-1, -1) (init digits)
    unit = maximum (drop (dozenIndex + 1) digits)

ifoldl :: (Int -> r -> a -> r) -> r -> [a] -> r
ifoldl f r t = foldr (\c k i x -> k (i + 1) (f i x c)) (\_ x -> x) t 0 r
