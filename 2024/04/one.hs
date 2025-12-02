import Data.List (transpose)
main = do
  input <- getContents
  print (solveExercise input)

solveExercise :: String -> Int
solveExercise = countAllXmas . lines

countAllXmas :: [String] -> Int
countAllXmas list =
  let horizontal = countList list
      vertical = countList (transpose list)
      diagonal1 = countDiagonals list
      diagonal2 = countDiagonals (transpose list)
  in vertical + horizontal + diagonal1 + diagonal2

countDiagonals :: [String] -> Int
countDiagonals list = countList (diagonals list)

diagonals :: [[a]] -> [[a]]
diagonals = tail . go [] where
  -- it is critical for some applications that we start producing answers
  -- before inspecting es_
  go b es_ = [h | h:_ <- b] : case es_ of
      []   -> transpose ts
      e:es -> go (e:ts) es
      where ts = [t | _:t <- b]

countList :: [String] -> Int
countList = sum . map countForwardAndBackward

countForwardAndBackward :: String -> Int
countForwardAndBackward str = countXmas str + countXmas (reverse str)

countXmas :: String -> Int
countXmas [] = 0
countXmas ('X':'M':'A':'S':rest) = 1 + countXmas rest
countXmas (_:rest) = 0 + countXmas rest
