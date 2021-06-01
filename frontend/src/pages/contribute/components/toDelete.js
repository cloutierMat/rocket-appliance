<h1>Trivia </h1>
				<div className={styles["form-wrapper"]}>
					<ul className={styles["flex-container"]}>
						<div className={styles["left-side"]}>
						<ul>
							Category: <br></br>
							<input
								type="text"
								placeholder="Rocket Science"
								value={data.category}
								onChange={(event) => { handleInfoChange(event, "category"); }}
								ref={inputFocus}
								onKeyPress={handlePreventEnterDefault}
							/>
						</ul>

						<ul>
							Game Name: <br></br>
							<input
								type="text"
								value={data.name}
								placeholder="Rocket Trivia"
								disabled={immutableGameName}
								onChange={(event) => { handleInfoChange(event, "name"); }}
								onKeyPress={handlePreventEnterDefault}
							/>
						</ul>

						<ul>
							Contributor: <br></br>
							<input
								type="text"
								defaultValue={data.author}
								disabled={true}
							// onKeyPress={handlePreventEnterDefault}
							/>
						</ul>

						<ul>
							<label className="game-description_contributor">Description:</label><br></br>
							<textarea
								cols="50"
								rows="5"
								value={data.description}
								placeholder="Tell us more about the game"
								onChange={(event) => { handleInfoChange(event, "description"); }} 
								className={styles["ul-description"]}/>
						</ul>
						</div>
						<div className={styles["right-side"]}>
						{data.questions[0] && data.questions[0].id && data.questions.map((question, questionIndex) => (
							<ul className={styles["question"]} key={question.id} >
								Question {questionIndex + 1} <br></br>
								<Controller
									name={question.id}
									control={control}
									defaultValue={question.question}
									render={({ field }) => <input  {...field}
										ref={questionFocus}
										onKeyPress={(e) => handleKeyOnQuestion(e, questionIndex)}
									/>}
								/>

								<button onClick={() => { handleRemoveQuestion(questionIndex); }}>Delete</button>
								<ul>

									<ul className={styles["link"]}>
										Link: <br></br>
										<input
											type="url"
											placeholder="Link to learn more"
											value={question.link}
											onChange={(event) => { handleLinkChange(event, questionIndex); }}
											onKeyPress={handlePreventEnterDefault}
										/>
									</ul>
									{data.questions[questionIndex].options.map((option, optionIndex) => (
										<ul className={styles["option"]} key={option.id}>
											Option {optionIndex + 1}
											<br/>
											<Controller
												name={option.id}
												control={control}
												defaultValue={option.option}
												render={({ field }) => <input {...field}
													ref={optionFocus}
													onKeyPress={(e) => handleKeyOnQuestion(e, questionIndex)}
												/>}
											/>

											<button onClick={() => { handleRemoveOption(optionIndex, questionIndex); }}>Delete</button>

										</ul>
									))}
								</ul>

								<section className={styles["option-button"]}>
									<button type="button" onClick={() => handleInsertOption(questionIndex)}>New option</button>
								</section>

							</ul>
						))
					}
					</div>
					</ul>
					<section className={styles["new-question"]}>
						<button type="button" onClick={handleInsertQuestion}>
							New question
					</button>
					</section>
					<input className={styles["submit"]} type="submit" />
					</div>
				</form>
		</div>