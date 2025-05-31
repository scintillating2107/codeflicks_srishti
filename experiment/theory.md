<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
  </script>
</head>
<body>

  <h2>V-Notch Weir</h2>
  <p>
    A V-notch weir is a triangular-shaped notch used to measure the flow of water in open channels.
    It is preferred for small discharge measurements because of its high sensitivity to small changes in flow.
  </p>

  <h2>Flow Equation</h2>
  <p>The theoretical discharge <em>Q</em> over a V-notch is given by:</p>

  \( Q = \frac{8}{15} C_d \tan\left(\frac{\theta}{2}\right) \sqrt{2g} \cdot H^{5/2} \)
  <p><strong>Where:</strong></p>
  <ul>
    <li><strong>Q</strong> = Discharge (m³/s)</li>
    <li><strong>C<sub>d</sub></strong> = Discharge coefficient (dimensionless)</li>
    <li><strong>g</strong> = Acceleration due to gravity (9.81 m/s²)</li>
    <li><strong>&#x03B8;</strong> = Angle of the notch (usually 90°)</li>
    <li><strong>H</strong> = Head of water above the notch apex (m)</li>
  </ul>

  <p>For a 90° V-notch, the formula simplifies to:</p>

  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mi>Q</mi>
    <mo>=</mo>
    <mn>1.38</mn>
    <mo>&#x2062;</mo>
    <mi>C</mi><mi>d</mi>
    <msup><mi>H</mi><mfrac><mn>5</mn><mn>2</mn></mfrac></msup>
  </math>

  <h2>Discharge Coefficient (Cd):</h2>
  <ul>
    <li>Accounts for energy losses and non-ideal flow behavior</li>
    <li>Typically ranges from 0.58 to 0.62 for a 90° V-notch</li>
    <li>Can be determined experimentally by comparing actual and theoretical discharge</li>
  </ul>

  <h2>Head Measurement (H):</h2>
  <ul>
    <li>Measured vertically from the apex of the notch to the free water surface</li>
    <li>Should be taken away from the notch (at least 4H upstream) to avoid surface disturbances</li>
  </ul>

</body>
</html>
