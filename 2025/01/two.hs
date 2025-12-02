main = do
  input <- getContents
  print (solveExercise input)

solveExercise = sum . map countZeros . scanl moveDial (start, 0) . map parseInstruction . lines

numPositions = 100

start = 50

countZeros :: (Int, Int) -> Int
countZeros (position, turns) =
  turns + (if position == 0 then 1 else 0)

type Instruction = (Char, Int)

parseInstruction :: String -> Instruction
parseInstruction (side : rest) = (side, read rest :: Int)

moveDial :: (Int, Int) -> Instruction -> (Int, Int)
moveDial lastState instruction =
  (newPosition `mod` numPositions, turns + crossed)
  where
    position = fst lastState
    side = fst instruction
    steps = snd instruction `mod` numPositions
    turns = snd instruction `div` numPositions
    newPosition = if side == 'R' then position + steps else position - steps
    crossed = if position /= 0 && (newPosition < 0) || (newPosition > numPositions) then 1 else 0
